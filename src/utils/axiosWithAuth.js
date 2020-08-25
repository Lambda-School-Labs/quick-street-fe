import axios from "axios";

const axiosWithAuth = () => {
  const token = localStorage.getItem("token");

  return axios.create({
   //  baseURL: "http://localhost:8000/api",
    baseURL: "https://market-avenue-be.herokuapp.com/api",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  });
};

export default axiosWithAuth;
