import axios from "axios";

import { toast } from "react-toastify";

const API_KEY = import.meta.env.VITE_API_KEY;
const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;

axios.defaults.baseURL = baseUrl;

export const getCurrancy = async () => {
  try {
    const { data } = await axios.get(`/${API_KEY}/latest/UAH`);
    console.log(data.conversion_rates);
    return data;
  } catch (error) {
    toast.error("Error fetching currency rates:", error);
  }
};

export const getConversion = async (from, to, amount) => {
  try {
    const { data } = await axios.get(
      `/${API_KEY}/pair/${from}/${to}/${amount}`
    );
    return data.conversion_result;
  } catch (error) {
    toast.error("Error fetching conversion", error);
  }
};
