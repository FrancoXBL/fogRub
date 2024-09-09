import { API_KEY } from "./API_KEY";
import axios from "axios";

export const sendData = async (endpoint, data) => {
    try {
      await axios.post(`${API_KEY}/api/${endpoint}`, data);
    } catch (err) {
     return(err.message)
    }
  };