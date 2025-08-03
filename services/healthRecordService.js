import axios from 'axios';
const API = 'http://localhost:3000/health-records';

export const getHealthRecords = async (userId) => {
  const res = await axios.get(`${API}/user/${userId}`);
  return res.data;
};

export const addHealthRecord = async (record) => {
  const res = await axios.post(API, record);
  return res.data;
};
