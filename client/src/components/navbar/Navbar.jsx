import React from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutFromRedux } from "../../redux/actions/auth";
import { BsCartFill} from 'react-icons/bs'
import './navbar.css'

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  currentItems: state.orders.currentItems
});

const actionRedux = {
  logoutFromRedux
}

const Navbar = ({ isAuth, history, logoutFromRedux, currentItems }) => {
  const handleLogout = (e) => {
    e.preventDefault();
    logoutFromRedux();
    history.push("/");
  };

  const userLink = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link className="nav-link font-weight-bold text-white" to="/order/detail">
          <div className="shopping">
           <span className="orders">ORDERS</span>
           <BsCartFill/>
           { currentItems ?
           <div className="orders-badge">{currentItems}</div> : null }
          </div>
        </Link>
      </li>
      <li className="nav-item">
        <a
          className="nav-link font-weight-bold text-white"
          href="null"
          onClick={handleLogout}
        >
          LOGOUT
        </a>
      </li>
    </ul>
  );

  const guestLink = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link className="nav-link font-weight-bold" to="/signin">
          SIGNIN
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar navbar-expand-lg">
      <Link className="brand navbar-brand font-weight-bold" to="/home">
        LUX&DEV
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {isAuth ? userLink : guestLink}
    </nav>
  );
};

export default connect(mapStateToProps, actionRedux)(withRouter(Navbar));
