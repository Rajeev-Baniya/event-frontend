import http from "./httpService";

const apiChkVnuAvl = "/venue/availability/";

const tokenKey = "token";

const getJwt = () => {
  return localStorage.getItem(tokenKey);
};

export const checkAvailabilty = async (values) => {
  const response = await http.get(`${apiChkVnuAvl}${values}`);
  return response;
};

export const deleteVenue = async (id) => {
  const response = await http.delete(`/venue/${id}`);
  return response;
};

export const editVenue = async (id, values) => {
  const response = await http.put(`/venue/${id}`, values);
  return response;
};

export const createVenue = async (values) => {
  http.setJwt(getJwt());
  const response = await http.post(`/venue`, values);
  return response;
};

http.setJwt(getJwt());

const venue = { checkAvailabilty, deleteVenue, editVenue, createVenue };

export default venue;
