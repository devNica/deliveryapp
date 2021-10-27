import axios from "axios";
import { SERVERADDRESS } from "../utils/constants";

export default function http({ server = SERVERADDRESS, headers = null } = {}) {
  return axios.create({
    baseURL: server,
    headers: {
      ...headers,
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      "Accept-Language": "es",
    },
  });
}