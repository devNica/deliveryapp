import http from "./http";
import { BASEURL } from "../utils/constants";

const auth = {
  signin: (credentials) =>
    http()
      .post(`${BASEURL}/auth/signin`, credentials)
      .then((res) => res.data),
};

const store = {
  info: () =>
    http()
      .get(`${BASEURL}/store/info`)
      .then((res) => res.data, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }),

  productsByCategoryId: (id) =>
    http()
      .get(`${BASEURL}/store/categories/${id}/products`)
      .then((res) => res.data, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }),

  prodexByCategoryId: (id) =>
      http()
      .get(`${BASEURL}/store/categories/${id}/prodex`)
      .then((res) => res.data, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }),
  
  calculateShippingFee: (data) =>
    http()
    .post(`${BASEURL}/store/shipping-cost`, data)
    .then((res) => res.data, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }),

  
    
};

export const api = {
  auth,
  store,
};
