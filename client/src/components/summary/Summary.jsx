import "./summary.css";
import { connect } from "react-redux";
import { useState } from "react";
import {
  BsFillArrowDownSquareFill,
  BsFillArrowUpSquareFill,
} from "react-icons/bs";
import ProductExtra from "../Extras/ProductExtras";
import {
  getProductExtraByCatIdFromRedux,
  clearProductExtraFromRedux,
} from "../../redux/actions/store";
import { useEffect } from "react";

const mapStateToProps = (state) => ({
  pex_fr: state.store.pex,
});

const actionsRedux = {
  getProductExtraByCatIdFromRedux,
  clearProductExtraFromRedux,
};

const Summary = (props) => {
  const [open, setOpen] = useState(false);
  const [currentExtra, setCurrenExtra] = useState([]);
  const { pex_fr, product } = props;
  const { getProductExtraByCatIdFromRedux, clearProductExtraFromRedux } = props;

  useEffect(() => {
    setCurrenExtra(pex_fr);
  }, [open, setCurrenExtra]);

  const renderExtras = currentExtra.map((item, i) => (
    <ProductExtra item={item} key={i} productId={product.id} />
  ));

  const handleOpenDropDown = async (id) => {
    await getProductExtraByCatIdFromRedux(id);
    setOpen(true);
  };

  const handleCloseDropDown = () => {
    setOpen(false);
    clearProductExtraFromRedux();
  };

  return (
    <div className="summary-product">
      <span className="summary-product-description">
        Qty: {product.qty} - Desc: {product.description} - Subtotal:{" "}
        {product.subtotal}
      </span>
      <div className="summary-toggle-dropdown">
        {!open ? (
          <BsFillArrowDownSquareFill
            className="icon-dropdown"
            onClick={() => handleOpenDropDown(product.fk_category)}
          />
        ) : (
          <BsFillArrowUpSquareFill
            className="icon-dropdown"
            onClick={() => handleCloseDropDown(product.fk_category)}
          />
        )}
        <span className="title-add-extra">Agregar Complemento</span>
      </div>
      {open ? <div className="summary-extras">{renderExtras}</div> : <></>}
    </div>
  );
};

export default connect(mapStateToProps, actionsRedux)(Summary);
