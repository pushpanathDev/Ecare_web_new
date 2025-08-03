import axios from 'axios';
const API = 'http://localhost:3000/caretakers';

export const fetchCaretakers = async () => {
  const res = await axios.get('http://localhost:3000/caretakers');
  return res.data;
};

