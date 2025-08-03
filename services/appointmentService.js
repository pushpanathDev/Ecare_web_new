// services/appointmentService.js
import axios from 'axios';
const API = 'http://localhost:3000/appointments';

export const getAppointmentsForUser = async (userId) => {
  const res = await axios.get(`${API}/user/${userId}`);
  return res.data;
};

export const bookAppointment = async (data) => {
  const res = await axios.post(API, data);
  return res.data;
};
