import axios from "axios";

export const getAlbum = async (endpoint) => {
  try {
    const response = await axios.get(endpoint);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addCard = async (endpoint, data) => {
  const headers = {
    "Content-Type": "application/json"
  };
  try {
    const response = await axios.post(endpoint, data, { headers });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteCard = async (endpoint, data) => {
  try {
    // debugger;
    // const response = await axios.delete(endpoint);
    
    // console.log(response.data);
    // return response.data;
    console.log("Sending DELETE request to:", endpoint);
    console.log("data to be sent:", data)
    const response  = await fetch(endpoint, {method: 'DELETE', body: data});
    // const response = await fetch(endpoint, {body: data});
    return response;
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error", error.message);
    }
    console.log(error.config);
  }
};
