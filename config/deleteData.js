import { API_KEY } from "./API_KEY";
import axios from "axios";

export const deleteData = async (endpoint, data) => {
    try {
      const response = await axios.delete(`${API_KEY}/api/${endpoint}`, {
        data: data,
      });
      return response.data.message;
    } catch (err) {
      return err.message;
    }
  };