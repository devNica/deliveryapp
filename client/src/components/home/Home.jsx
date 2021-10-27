import "./home.css";
import CategoriesContainer from "../container/Categories/CategoriesContainer";
import { connect } from "react-redux";
import Loading from "../loading/Loading";

const mapStateToProps = (state) => ({
  loadingCategories_fr: state.store.loadingCategories,
});

const Home = ({ loadingCategories_fr }) => {
  return (
    <>
      {loadingCategories_fr ? (
        <CategoriesContainer />
      ) : (
        <div className="loading-categories">
          <Loading />
        </div>
      )}
    </>
  );
};

export default connect(mapStateToProps, {})(Home);
