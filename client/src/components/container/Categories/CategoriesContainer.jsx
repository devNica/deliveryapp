import "./categoriescontainer.css";
import { connect } from "react-redux";
import Categories from "../../categories/Categories";

const mapStateToProps = (state) => ({
  categories_fr: state.store.categories,
});

const actionsRedux = {};

const CategoriesContainer = ({ categories_fr }) => {
  return (
    <>
      {categories_fr[0] ? (
        <div className="categories-container">
          <Categories categories={categories_fr} />
        </div>
      ) : (
        <span className="categories-container-alert">
          No se encontro categorias
        </span>
      )}
    </>
  );
};

export default connect(mapStateToProps, actionsRedux)(CategoriesContainer);
