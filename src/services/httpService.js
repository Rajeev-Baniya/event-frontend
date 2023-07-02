import axios from "axios";

const setJwt = (jwt) => {
  const newJwt = jwt?.replaceAll('"', "");
  axios.defaults.headers.common["Authorization"] = `Bearer ${newJwt}`;
};

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};

export default http;
