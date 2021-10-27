import "./containercurrentorder.css";
import { connect } from "react-redux";
import CurrentOrder from "../../currentOrder/CurrentOrder";

const mapStateToProps = (state) => ({
  currentOrder: state.orders.currentOrder,
  currentAmount: state.orders.currentAmount
});

const actionsRedux = {};

const ContainerCurrentOrder = ({ currentOrder, currentAmount }) => {
  const listCurrentOrder = currentOrder.map((item, i) => (
    <CurrentOrder productItem={item} key={i}/>
  ));

  return (
    <div className="currentOrder-container">
        {listCurrentOrder}
        <div className="info">
            <div className="subtotal">
                Sub Total: C$ {currentAmount.toFixed(2)}
            </div>
        </div>
    </div>
    );
};

export default connect(mapStateToProps, actionsRedux)(ContainerCurrentOrder);
