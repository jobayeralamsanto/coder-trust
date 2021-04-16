import axios from "axios";

const API_URL = "https://wu89z93mp4.execute-api.us-west-2.amazonaws.com/dev/authentication/";

const register = (name,medium,email, phone, password,role) => {
  return axios.post(API_URL + "signup", {
    name,
    medium,
    email,
    phone,
    password,
    role,
  });
};

const login = (medium,email,phone, password) => {
  return axios
    .post(API_URL + "signin", {
      medium,
      email,
      phone,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const verifyUser = (code) => {
  return axios.get(API_URL + "confirm-signup/" + code).then((response) => {
    return response.data;
  });
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
  verifyUser,
};
