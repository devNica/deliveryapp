import { connect } from "react-redux";
import "./products.css";
import { BsFillCartDashFill, BsFillCartPlusFill } from "react-icons/bs";
import { useCallback, useEffect, useState } from "react";
import { agregateProductShoppingCartFromRedux, removeProductShoppingCartFromRedux } from "../../redux/actions/orders";

const mapStateToProps = (state) => ({
  currentOrder_fr: state.orders.currentOrder,
});

const actionsRedux = {
  agregateProductShoppingCartFromRedux,
  removeProductShoppingCartFromRedux
};

const Products = ({
  product,
  agregateProductShoppingCartFromRedux,
  removeProductShoppingCartFromRedux,
  currentOrder_fr,
}) => {
  // const [productQty, setProductQty] = useState(0);
  const [currentQty, setCurrentQty] = useState(0);

  const handleRemoveProduct = (product) => {
    if (currentQty > 0) {
      setCurrentQty((prev) => currentQty - 1);
      const qty = currentQty - 1
      const subtotal = qty * parseFloat(product.price)
      removeProductShoppingCartFromRedux({ ...product, qty, subtotal })
    }
  };

  const handleAgregateProduct = (product) => {
    if (currentQty < 10) {
      setCurrentQty((prev) => currentQty +1 );
      const qty = currentQty + 1
      const subtotal = qty * parseFloat(product.price)
      agregateProductShoppingCartFromRedux({ ...product, qty, subtotal });
    }
  };

  const getQtyProductsById = useCallback(()=>{
    if (currentOrder_fr[0]) {
      currentOrder_fr.map((item) => {
        if(item.id === product.id) {
          setCurrentQty(item.qty)
        }
        return item
      });
    }
  }, [currentOrder_fr, product])

  useEffect(() => {
    getQtyProductsById();
  }, [getQtyProductsById]);

  const renderProduct = (
    <>
      <img src={product.url} className="product-img" alt="" />
      <span className="product-name">{product.product}</span>
      <div className="product-shopping">
        <div className="ps-top">
          <span className="product-description">{product.description}</span>
          <span className="product-price">C${product.price}</span>
        </div>
        <div className="options">
          <div
            className={ currentQty ? "ps-remove" : "ps-remove-disabled"}
            onClick={() => handleRemoveProduct(product)}
          >
            <BsFillCartDashFill />
          </div>
          <div className="ps-qty">{ currentQty }</div>
          <div
            className="ps-add"
            onClick={() => handleAgregateProduct(product)}
          >
            <BsFillCartPlusFill />
          </div>
        </div>
      </div>
    </>
  );

  return <>{renderProduct}</>;
};

export default connect(mapStateToProps, actionsRedux)(Products);
