import "./currentorder.css";
import { FaTrashAlt } from "react-icons/fa";
import { connect } from 'react-redux'
import { removeItemShoppingCartFromRedux } from '../../redux/actions/orders'
import { Link } from "react-router-dom";

const actionsRedux = {
 removeItemShoppingCartFromRedux
}

const CurrentOrder = ({ productItem, removeItemShoppingCartFromRedux }) => {

 const handleDeleteItem = id => {
    removeItemShoppingCartFromRedux(id)
 }

  return (
    <div className="current-order">
      <div className="item">
        <Link className="container-image" to={`/order/item/${productItem.id}/detail`}>
          <img src={productItem.url} alt="" className="item-image" />
        </Link>
        <div className="container-description">
          <span>{productItem.product}</span>
          <span>{productItem.description}</span>
          <span>C$ {productItem.accumulatedAmount.toFixed(2)}</span>
        </div>
        <div className="container-extra">
          <span className="badge-extra">E</span>
          <span className="extra-qty">{productItem.accumulatedItems-productItem.qty}</span>
        </div>
        <div className="container-main-qty">
          <span className="badge-main">M</span>
          <span className="item-qty">{productItem.qty}</span>
        </div>
        <div className="container-delete" onClick={()=>handleDeleteItem(productItem.id)}>
          <FaTrashAlt className="delete-icon" />
        </div>
      </div>
    </div>
  );
};

export default connect(null, actionsRedux)(CurrentOrder);
