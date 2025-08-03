import axios from 'axios';
const API = 'http://localhost:3000/users';

export const getUserById = async (id) => {
  const res = await axios.get(`${API}/${id}`);
  return res.data;
};

export const createUser = async (userData) => {
  const res = await axios.post(API, userData);
  return res.data;
};

export const updateUser = async (id, updateData) => {
  const res = await axios.put(`${API}/${id}`, updateData);
  return res.data;
};
