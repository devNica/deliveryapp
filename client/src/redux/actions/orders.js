import { api } from "../../service/api"
import { AGREGATEPRODUCTSHOPPINGCART, REMOVEITEMSHOPPINGCART, REMOVEPRODUCTSHOPPINGCART, SETSHIPPINGCOST } from "./types"


export const setShippingCostFromRedux = () => async (dispatch, getState) => {
    const { addresses } = getState().auth
    if(addresses[0]) {
        /** obtiene la direccion principal del usuario */
        const address = addresses.filter(item=>item.is_principal === 1)

        const { meta, message } = await api.store.calculateShippingFee({ userLat: address[0].latitude, userLong: address[0].longitude })

        if(meta.service) {
            dispatch({
                type: SETSHIPPINGCOST,
                payload: meta.shippingCost
            })
        } else {
            console.log('message', message)
        }

    } else {
        console.log('no hay direcciones registradas')
    }
}


export const agregateProductShoppingCartFromRedux = (product) => (dispatch, getState) => {
    const { currentOrder, currentItems,currentAmount } = getState().orders
    /** verificar que hayan ordernes actuales en espera */
    if(currentOrder[0] && currentItems > 0) {
        
        let productsQty = 0
        let updateCurrentAmount = currentAmount + parseFloat(product.price)
        
        /** si el producto ya existe en la orden */
        if(currentOrder.some(item=>item.id===product.id)){
            const updateOrder = currentOrder.map(el => {
                if(el.id === product.id) {
                    el.qty+=1
                    el.subtotal = el.price*(el.qty)
                    return el
                } return el
            })

            updateOrder.forEach(element => {
                productsQty+=element.qty
            });

            dispatch({
                type:AGREGATEPRODUCTSHOPPINGCART,
                payload: {
                    currentOrder: updateOrder,
                    currentItems: productsQty,
                    currentAmount: updateCurrentAmount,
                }
            })
        } else {
            /** si el producto se esta agregado por primeravez */
            currentOrder.forEach(element => {
                productsQty+=element.qty
            })

            dispatch({
                type: AGREGATEPRODUCTSHOPPINGCART,
                payload: {
                    currentOrder: [...currentOrder, product],
                    currentItems: productsQty + 1,
                    currentAmount: updateCurrentAmount
                }
            })

        }
        
    } else {
        dispatch({
            type: AGREGATEPRODUCTSHOPPINGCART,
            payload: {
                currentOrder: [...currentOrder, product],
                currentItems: product.qty,
                currentAmount: product.subtotal
            } 
        })
    }
}

export const removeProductShoppingCartFromRedux = (product) => (dispatch, getState) => {
    const { currentOrder, currentItems, currentAmount } = getState().orders
    /** verificar que hayan ordernes actuales en espera */
    if(currentOrder[0] && currentItems > 0) {
        
        let productsQty = 0
        let updateOrder = []
        let updateCurrentAmount = currentAmount - parseFloat(product.price)

        /** si el producto ya existe en la orden */
        if(currentOrder.some(item=>item.id===product.id)){

            if(product.qty > 0) {
                updateOrder = currentOrder.map(el => {
                    if(el.id === product.id) {
                        el.qty-=1
                        el.subtotal = el.price*(el.qty)
                        return el
                    } return el
                })
    
                updateOrder.forEach(element => {
                    productsQty+=element.qty
                });
    
                dispatch({
                    type:AGREGATEPRODUCTSHOPPINGCART,
                    payload: {
                        currentOrder: updateOrder,
                        currentItems: productsQty,
                        currentAmount: updateCurrentAmount
                    }
                })
            } else {
                
                updateOrder = currentOrder.filter(item=> item.id !== product.id)

                console.log()

                updateOrder.forEach(element => {
                    productsQty+=element.qty
                });

                dispatch({
                    type: REMOVEPRODUCTSHOPPINGCART,
                    payload: {
                        currentOrder: updateOrder,
                        currentItems: productsQty,
                        currentAmount: updateCurrentAmount
                    }
                })
            }
            
        } 
        
    } 
}

export const removeItemShoppingCartFromRedux = id => (dispatch, getState) => {
    const { currentOrder, currentItems, currentAmount } = getState().orders 

    const updateOrder = currentOrder.filter(item=>item.id !== id)
    const itemRemoved = currentOrder.filter(item=>item.id === id)

    console.log('itemremoved', itemRemoved)
    console.log('updateOrder', updateOrder)

    dispatch({
        type: REMOVEITEMSHOPPINGCART,
        payload: {
            currentOrder: updateOrder,
            currentItems: currentItems - itemRemoved[0].qty,
            currentAmount: currentAmount - itemRemoved[0].subtotal
        }
    })

}
