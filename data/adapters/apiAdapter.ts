import axios from "axios";

const ApiAdapter = (baseURL: string) => {
  const client = axios.create({
    baseURL: baseURL,
  });
  return client;
};

export default ApiAdapter;
