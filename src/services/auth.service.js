import axios from "axios";

const API_URL = "https://wu89z93mp4.execute-api.us-west-2.amazonaws.com/dev/authentication/";

const register = (name, medium, email, phone, password, role) => {
  return axios.post(API_URL + "signup", {
    name,
    medium,
    phone,
    email,
    password,
    role,
  });
};

const login = (medium, phone, email, password) => {
  return axios
    .post(API_URL + "signin", {
      medium,
      phone,
      email,
      password,
    })
    .then((response) => {
      console.log(response);
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

const confirmationCodeValidity = (medium, email, phone) => {
  return axios.post(API_URL + 'get-confirmation-code-validity', {
    medium,
    email,
    phone
  })
}

const resendConfirmationCode = (medium, email, phone) => {
  return axios.post(API_URL + 'resend-confirmation-code', {
    medium,
    email,
    phone
  })
}

const confirmSignup = (medium, email, phone, confirmationCode) => {
  return axios.post(API_URL + 'confirm-signup', {
    medium,
    email,
    phone,
    confirmationCode
  })
}

export default {
  register,
  login,
  logout,
  getCurrentUser,
  verifyUser,
  confirmationCodeValidity,
  resendConfirmationCode,
  confirmSignup
};
