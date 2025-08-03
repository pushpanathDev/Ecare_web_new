import axios from 'axios';
const API = 'http://localhost:3000/medications';

export const getMedications = async (userId) => {
  const res = await axios.get(`${API}/user/${userId}`);
  return res.data;
};

export const addMedication = async (data) => {
  const res = await axios.post(API, data);
  return res.data;
};
