import { api } from "../../service/api";
import {
  AGREGATEPRODEXSHOPPINGCART,
  AGREGATEPRODUCTSHOPPINGCART,
  REMOVEITEMSHOPPINGCART,
  REMOVEPRODEXSHOPPINGCART,
  REMOVEPRODUCTSHOPPINGCART,
  SETSHIPPINGCOST,
} from "./types";

export const setShippingCostFromRedux = () => async (dispatch, getState) => {
  const { addresses } = getState().auth;
  if (addresses[0]) {
    /** obtiene la direccion principal del usuario */
    const address = addresses.filter((item) => item.is_principal === 1);

    const { meta, message } = await api.store.calculateShippingFee({
      userLat: address[0].latitude,
      userLong: address[0].longitude,
    });

    if (meta.service) {
      dispatch({
        type: SETSHIPPINGCOST,
        payload: meta.shippingCost,
      });
    } else {
      console.log("message", message);
    }
  } else {
    console.log("no hay direcciones registradas");
  }
};

export const agregateProductShoppingCartFromRedux =
  (product) => (dispatch, getState) => {
    const { currentOrder, currentItems, currentAmount } = getState().orders;
    /** si hay ordenes actuales en espera entra al condicional */
    if (currentOrder[0] && currentItems > 0) {
      // let productsQty = 0
      let accumulatedItems = 0;
      let updateCurrentAmount = currentAmount + parseFloat(product.price);

      /** si el producto ya existe en la orden */
      if (currentOrder.some((item) => item.id === product.id)) {
        const updateOrder = currentOrder.map((el) => {
          if (el.id === product.id) {
            el.qty += 1;
            el.subtotal = el.price * el.qty;

            /**se agrega el calculo del monto acumulado */
            el.accumulatedAmount += parseFloat(product.price);

            /**se agrega el calculo de los items acumulados */
            el.accumulatedItems += 1;

            return el;
          }
          return el;
        });

        updateOrder.forEach((element) => {
          accumulatedItems += element.accumulatedItems;
        });

        dispatch({
          type: AGREGATEPRODUCTSHOPPINGCART,
          payload: {
            currentOrder: updateOrder,
            currentItems: accumulatedItems,
            currentAmount: updateCurrentAmount,
          },
        });
      } else {
        /** si el producto se esta agregado por primeravez */

        const currentProduct = {
          ...product,
          extras: [],
          accumulatedAmount: product.subtotal,
          accumulatedItems: product.qty,
        };

        dispatch({
          type: AGREGATEPRODUCTSHOPPINGCART,
          payload: {
            currentOrder: [...currentOrder, currentProduct],
            currentItems: [...currentOrder, currentProduct].reduce(function (
              acc,
              curr
            ) {
              return acc + curr.accumulatedItems;
            },
            0),
            currentAmount: [...currentOrder, currentProduct].reduce(function (
              acc,
              curr
            ) {
              return acc + curr.accumulatedAmount;
            },
            0),
          },
        });
      }
    } else {
      const currentProduct = {
        ...product,
        extras: [],
        accumulatedAmount: product.subtotal,
        accumulatedItems: product.qty,
      };

      dispatch({
        type: AGREGATEPRODUCTSHOPPINGCART,
        payload: {
          currentOrder: [...currentOrder, currentProduct],
          currentItems: product.qty,
          currentAmount: product.subtotal,
        },
      });
    }
  };

export const removeProductShoppingCartFromRedux =
  (product) => (dispatch, getState) => {
    const { currentOrder, currentItems } = getState().orders;
    /** verificar que hayan ordernes actuales en espera */
    if (currentOrder[0] && currentItems > 0) {
      // let productsQty = 0;
      let updateOrder = [];
      // let updateCurrentAmount = currentAmount - parseFloat(product.price);

      /** si el producto ya existe en la orden */
      if (currentOrder.some((item) => item.id === product.id)) {
        if (product.qty > 0) {
          updateOrder = currentOrder.map((el) => {
            if (el.id === product.id) {
              el.qty -= 1;
              el.subtotal = el.price * el.qty;

              /**se agrega el calculo del monto acumulado */
              el.accumulatedAmount -= parseFloat(product.price);

              /**se agrega el calculo de los items acumulados */
              el.accumulatedItems -= 1;

              return el;
            }
            return el;
          });

          dispatch({
            type: REMOVEPRODUCTSHOPPINGCART,
            payload: {
              currentOrder: updateOrder,
              currentItems: updateOrder.reduce(function (acc, curr) {
                return acc + curr.accumulatedItems;
              }, 0),
              currentAmount: updateOrder.reduce(function (acc, curr) {
                return acc + curr.accumulatedAmount;
              }, 0),
            },
          });
        } else {
          updateOrder = currentOrder.filter((item) => item.id !== product.id);

          dispatch({
            type: REMOVEPRODUCTSHOPPINGCART,
            payload: {
              currentOrder: updateOrder,
              currentItems: updateOrder.reduce(function (acc, curr) {
                return acc + curr.accumulatedItems;
              }, 0),
              currentAmount: updateOrder.reduce(function (acc, curr) {
                return acc + curr.accumulatedAmount;
              }, 0),
            },
          });
        }
      }
    }
  };

export const removeItemShoppingCartFromRedux = (id) => (dispatch, getState) => {
  const { currentOrder } = getState().orders;

  const updateOrder = currentOrder.filter((item) => item.id !== id);

  dispatch({
    type: REMOVEITEMSHOPPINGCART,
    payload: {
      currentOrder: updateOrder,
      currentItems: updateOrder.reduce(function (acc, curr) {
        return acc + curr.accumulatedItems;
      }, 0),
      currentAmount: updateOrder.reduce(function (acc, curr) {
        return acc + curr.accumulatedAmount;
      }, 0),
    },
  });
};

export const agregateProdexShoppingCart =
  (prodex, productId) => (dispatch, getState) => {
    const { currentOrder, currentItems } = getState().orders;
    /** verificar que hayan ordernes actuales en espera */
    if (currentOrder[0] && currentItems > 0) {
      /** objetos que no van ser actualizados en la accion */
      let restObjects = currentOrder.filter((item) => item.id !== productId);
      /** objeto que se va actualizar en la accion */
      let matchedObject = currentOrder.filter((item) => item.id === productId);

      /**
       * se mapea la matriz de objetos que coinciden con el filtro, para actualizar
       * los complementos asociados al mismo
       */
      const updateProduct = matchedObject.map((item) => {
        /**verficamos si el complemento que se desea agregar ya esta registrado*/
        if (item.extras.some((extra) => extra.id === prodex.id)) {
          /**
           * mapeamos para acceder los atributos del complemento que va ser actualizado
           * los atributos que se actualizan son la cantidad y el subtotal
           */
          item.extras.map((el) => {
            if (el.id === prodex.id) {
              el.qty += 1;
              el.subtotal = parseFloat(el.price) * el.qty;
            }
            return el;
          });
        } else {
          /** si el complemento no esta registrado, se agrega directamente*/
          item.extras = [...item.extras, prodex];
        }

        item.accumulatedAmount =
          item.extras.reduce(function (acc, curr) {
            return acc + curr.qty * parseFloat(curr.price);
          }, 0) + item.subtotal;

        item.accumulatedItems =
          item.extras.reduce(function (acc, curr) {
            return acc + curr.qty;
          }, 0) + item.qty;

        return item;
      });

      dispatch({
        type: AGREGATEPRODEXSHOPPINGCART,
        payload: {
          currentOrder: [...restObjects, ...updateProduct],
          currentItems: [...restObjects, ...updateProduct].reduce(function (
            acc,
            curr
          ) {
            return acc + curr.accumulatedItems;
          },
          0),
          currentAmount: [...restObjects, ...updateProduct].reduce(function (
            acc,
            curr
          ) {
            return acc + curr.accumulatedAmount;
          },
          0),
        },
      });
    }
  };

export const removeProdexShoppingCart =
  (prodex, productId) => (dispatch, getState) => {
    const { currentOrder, currentItems } = getState().orders;

    /** verificar que existe una orden en espera */
    if (currentOrder[0] && currentItems > 0) {
      /** objetos que no van ser actualizados en la accion */
      let restObjects = currentOrder.filter((item) => item.id !== productId);
      /** objeto que se va actualizar en la accion */
      let matchedObject = currentOrder.filter((item) => item.id === productId);

      /**
       * se mapea la matriz de objetos que coinciden con el filtro, para actualizar
       * los complementos asociados al mismo
       */
      const updateProduct = matchedObject.map((item) => {
        /**verficamos si el complemento que se desea eliminar ya esta registrado*/
        if (item.extras.some((extra) => extra.id === prodex.id)) {
          if (prodex.qty > 0) {
            /**
             * mapeamos para acceder los atributos del complemento que va ser actualizado
             * los atributos que se actualizan son la cantidad y el subtotal
             */
            item.extras.map((el) => {
              if (el.id === prodex.id) {
                el.qty -= 1;
                el.subtotal = parseFloat(el.price) * el.qty;
              }
              return el;
            });
          } else {
            item.extras = item.extras.filter((item) => item.id !== prodex.id);
          }
        }

        item.accumulatedAmount =
          item.extras.reduce(function (acc, curr) {
            return acc + curr.qty * parseFloat(curr.price);
          }, 0) + item.subtotal;

        item.accumulatedItems =
          item.extras.reduce(function (acc, curr) {
            return acc + curr.qty;
          }, 0) + item.qty;

        return item;
      });

      dispatch({
        type: REMOVEPRODEXSHOPPINGCART,
        payload: {
          currentOrder: [...restObjects, ...updateProduct],
          currentItems: [...restObjects, ...updateProduct].reduce(function (
            acc,
            curr
          ) {
            return acc + curr.accumulatedItems;
          },
          0),
          currentAmount: [...restObjects, ...updateProduct].reduce(function (
            acc,
            curr
          ) {
            return acc + curr.accumulatedAmount;
          },
          0),
        },
      });
    }
  };
