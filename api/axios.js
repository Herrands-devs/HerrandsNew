import axios from "axios";
// import ENV from "../config.service";

// import { getTokenFromLocalStorage } from "../utilities/localStorage";

// const { apiUrl } = ENV;
const api = axios.create({
  baseURL: `https://herrand-backend-5a39ee15054e.herokuapp.com`,
});

const Axios = async (method = "get", endpoint, payload, contentType) => {
  let response = {};
  api.interceptors.request.use(async (config) => {
    // const value = getTokenFromLocalStorage();
    // if (value !== null) {
    //   config.headers["Authorization"] = `Bearer ${value}`;
    // }
    if (contentType) {
      config.headers["Content-Type"] = contentType;
    }
    return config;
  });
  try {
    if (method === "get") {
      const { data, status } = await api.get(endpoint);
      response = { data, status };
    } else if (method === "post") {
      const { data, status } = await api.post(endpoint, payload);
      response = { data, status };
    } else if (method === "put") {
      const { data, status } = await api.put(endpoint, payload);
      response = { data, status };
    } else if (method === "patch") {
      const { data, status } = await api.patch(endpoint, payload);
      response = { data, status };
    } else if (method === "delete") {
      const { data, status } = await api.delete(endpoint);
      response = { data, status };
    }
  } catch (error) {
    if (error.response && error.response.status)
      response.status = error.response.status;
    else response.status = 500;
    if (error.response && error.response.data)
      response.data = error.response.data;
    else response.error = error.message;
  }
  if (response.status === 401) {
    localStorage.clear();
    window.location.href = "/";
    return;
  }
  if (response.data) response.data = response.data.data;

  return response;
};

export default Axios;
