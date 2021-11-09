import "./productextra.css";
import { BsFillCartDashFill, BsFillCartPlusFill } from "react-icons/bs";
import { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { agregateProdexShoppingCart, removeProdexShoppingCart } from "../../redux/actions/orders";

const mapStateToProps = (state) => ({
  currentOrder_fr: state.orders.currentOrder,
});

const actionsRedux = {
  agregateProdexShoppingCart,
  removeProdexShoppingCart
};

const ProductExtra = (props) => {
  const [currentQty, setCurrentQty] = useState(0);

  const { item, productId } = props;
  const { currentOrder_fr } = props;
  const { agregateProdexShoppingCart, removeProdexShoppingCart } = props;

  const handleRemoveProdex = (prodex) => {
    if (currentQty > 0) {
      setCurrentQty((prev) => currentQty - 1);
      const qty = currentQty - 1;
      const subtotal = qty * parseFloat(prodex.price);
      removeProdexShoppingCart({ ...prodex, qty, subtotal }, productId)
    }
  };

  const handleAgregateProdex = (prodex) => {
    if (currentQty < 10) {
      setCurrentQty((prev) => currentQty + 1);
      const qty = currentQty + 1;
      const subtotal = qty * parseFloat(prodex.price);
      agregateProdexShoppingCart({ ...prodex, qty, subtotal }, productId);
    }
  };

  const getProdexById = useCallback(() => {
    if (currentOrder_fr[0]) {
      const matchedProduct = currentOrder_fr.filter(
        (product) => product.id === productId
      );

      matchedProduct[0].extras.map(el=>{
        if(el.id === item.id){
          setCurrentQty(el.qty);
        }
        return el
      })
    }
  }, [currentOrder_fr, productId, item]);

  useEffect(() => {
    getProdexById();
  }, [getProdexById]);

  return (
    <div className="product-extra">
      <div className="pex-shopping">
        <div className="pex-top">
          <span className="pex-description">
            {item.description} C${item.price}
          </span>
        </div>
        <div className="pex-options">
          <div
            className={currentQty ? "pex-remove" : "pex-remove-disabled"}
            onClick={() => handleRemoveProdex(item)}
          >
            <BsFillCartDashFill />
          </div>
          <div className="pex-qty">{currentQty}</div>
          <div className="pex-add" onClick={() => handleAgregateProdex(item)}>
            <BsFillCartPlusFill />
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, actionsRedux)(ProductExtra);
