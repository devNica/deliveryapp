import { useEffect, useCallback } from "react";
import { connect } from "react-redux";
import {
  getProductsByCatIdFromRedux,
  clearProductsFromRedux,
} from "../../../redux/actions/store";
import Loading from "../../loading/Loading";
import Products from "../../products/Products";
import "./productcontainer.css";

const mapStateToProps = (state) => ({
  loadingProducts_fr: state.store.loadingProducts,
  products_fr: state.store.products
});

const actionsRedux = {
  getProductsByCatIdFromRedux,
  clearProductsFromRedux,
};

const ProductsContainer = (props) => {
  const idCategory = props.match.params.id;
  const {
    getProductsByCatIdFromRedux,
    clearProductsFromRedux,
    loadingProducts_fr,
    products_fr
  } = props;

  const getProducts = useCallback(async () => {
    await getProductsByCatIdFromRedux(idCategory);
  }, [getProductsByCatIdFromRedux, idCategory]);

  useEffect(() => {
    getProducts();

    return () => clearProductsFromRedux();
  }, [getProducts, clearProductsFromRedux]);

  const listProducts = products_fr !== undefined ? products_fr.map((product, i)=>(
    <div className="product" key={i}>
      <Products product={product}/>
    </div>
  )) : null

  return (
    <>
      {loadingProducts_fr ? (
        <div className="product-container">
          {listProducts}
        </div>
      ) : (
        <div className="loading-products">
          <Loading />
        </div>
      )}
    </>
  );
};

export default connect(mapStateToProps, actionsRedux)(ProductsContainer);
