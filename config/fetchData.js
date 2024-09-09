import { API_KEY } from "./API_KEY";
import axios from "axios";

export const fetchData = async (endpoint) => {
    try {
      const response = await axios.get(`${API_KEY}/api/${endpoint}`);
      return(response.data);
    } catch (err) {
     return(err.message)
    }
  };