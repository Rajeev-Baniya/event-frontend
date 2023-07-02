import http from "./httpService";

const apiEndpointLogin = "/auth/login";
const apiEndpointRegister = "/auth/register";

export const login = async (values) => {
  const response = await http.post(`${apiEndpointLogin}`, values);
  return response;
};

export const register = async (values) => {
  const response = await http.post(`${apiEndpointRegister}`, values);
  return response;
};

export const userDelete = async (id) => {
  const response = await http.delete(`users/${id}`);
  return response;
};

const auth = { login, register, userDelete };

export default auth;
