import axios from "axios";

const axiosWithAuth = () => {
  const token = localStorage.getItem("token");

  return axios.create({
    // baseURL: "http://localhost:5000/api",
    baseURL: "https://market-avenue.herokuapp.com/api",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  });
};

export default axiosWithAuth;
