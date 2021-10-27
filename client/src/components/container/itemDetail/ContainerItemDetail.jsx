import "./containeritemdetail.css";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import Products from "../../products/Products";

const mapStateToProps = (state) => ({
  currentOrder: state.orders.currentOrder,
});

const actionsRedux = {};

const ContainerItemDetail = (props) => {
  const [item, setItem] = useState({});
  const { currentOrder } = props;
  const idProduct = props.match.params.id;

  useEffect(() => {
    const fetchItem = currentOrder.filter(
      (item) => item.id === parseInt(idProduct)
    );
    setItem(fetchItem[0]);
  }, [currentOrder, idProduct]);

  return (
    <>
      {item ? (
        <div className="item-container">
          <div className="item-product">
            <Products product={item} />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default connect(mapStateToProps, actionsRedux)(ContainerItemDetail);
