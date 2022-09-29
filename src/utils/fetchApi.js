import axios from 'axios';

const handleApi = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

export const fetchApi = async (api) => {
  const { data } = await handleApi.get(api);
  return data;
};
