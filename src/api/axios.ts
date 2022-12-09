import axios from "axios";

export default axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_FAIROSHOST,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
