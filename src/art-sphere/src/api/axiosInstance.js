import axios from "axios";

const axiosInstace = axios.create({
  baseURL: "https://127.0.0.1:7252/api",
  // baseURL: "http://127.0.0.1:5006/api",
});

export default axiosInstace;
