import "./summarycontainer.css";
import { connect } from "react-redux";
import Summary from "../../summary/Summary";

const mapStateToProps = (state) => ({
  currentOrder_fr: state.orders.currentOrder,
  currentItems_fr: state.orders.currentItems

});

const SummaryContainer = ({ currentOrder_fr, currentItems_fr }) => {

  const renderCurrentOrder = currentOrder_fr.map((product, i) => (
    <Summary product={product} items={currentItems_fr} key={i}/>
  ));

  return (
    <div className="summary-container">
      <h2 className="summary-container-title">Resumen</h2>
      {renderCurrentOrder}
    </div>
  );
};

export default connect(mapStateToProps, {})(SummaryContainer);
