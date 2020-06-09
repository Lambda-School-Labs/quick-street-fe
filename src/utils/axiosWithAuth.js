import axios from "axios";

const axiosWithAuth = () => {
  const token = localStorage.getItem("token");

  return axios.create({
    // baseURL: 'https://quickstlabs.herokuapp.com/api/v1.0/',
    baseURL: "http://localhost:5000/api",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  });
};

export default axiosWithAuth;
