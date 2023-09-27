import axios from "axios";

const setJwt = (jwt) => {
  const newJwt = jwt?.replaceAll('"', "");
  axios.defaults.headers.common["Authorization"] = `Bearer ${newJwt}`;
};

// axios.defaults.baseURL = "https://event-backend-yeg3.onrender.com/api/";
axios.defaults.baseURL = "/api/";

// "proxy": "https://event-backend-yeg3.onrender.com/api/"

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};

export default http;
