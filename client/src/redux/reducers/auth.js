import { AUTHFAILED, LOADUSER, LOGINSUCCESS, LOGOUT } from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  user: null,
  isAuth: false,
  addresses: [],
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGINSUCCESS:
      localStorage.setItem("token", action.payload.token)
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        addresses: action.payload.addresses,
        isAuth: true,
      };

    case LOADUSER:
      return {
        ...state,
        isAuth: true,
      };

    case LOGOUT:
    case AUTHFAILED:
      return {
        ...state,
        isAuth: false,
        token: "",
        user: "",
        addresses: []
      };

    default:
      return state;
  }
};
