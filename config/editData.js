import { API_KEY } from "./API_KEY";
import axios from "axios";

export const editData = async (endpoint, data) => {
  try {
    await axios.put(`${API_KEY}/api/${endpoint}`, data);
  } catch (err) {
    return err.message;
  }
};
