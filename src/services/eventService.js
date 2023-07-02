import http from "./httpService";

const apiCreateEvent = "/events";

const tokenKey = "token";

const getJwt = () => {
  return localStorage.getItem(tokenKey);
};

export const createEvent = async (values, id) => {
  const response = await http.post(`${apiCreateEvent}/${id}`, values);
  return response;
};

export const userEvents = async (uid) => {
  const response = await http.get(`/events/user/${uid}`);
  return response;
};

export const deleteEvent = async (id) => {
  const response = await http.delete(`/events/${id}`);
  return response;
};

export const getAllBookings = async () => {
  const response = await http.get(`/allevents/`);
  return response;
};

export const editEvent = async (id, values) => {
  const response = await http.put(`/events/${id}`, values);
  return response;
};

http.setJwt(getJwt());

const event = {
  createEvent,
  userEvents,
  deleteEvent,
  getAllBookings,
  editEvent,
};

export default event;
