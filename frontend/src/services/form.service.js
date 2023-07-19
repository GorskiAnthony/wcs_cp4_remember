import axios from "./axios";

export const browse = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error.message);
  }
};

export const add = async (url, data) => {
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const edit = async (url, data) => {
  try {
    const response = await axios.put(url, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const destroy = async (url) => {
  try {
    const response = await axios.delete(url);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const logout = async (url) => {
  try {
    const response = await axios.post(url);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
