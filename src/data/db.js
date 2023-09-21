import axios from "axios";

export const getAlbum = async (endpoint) => {
  try {
    const response = await axios.get(endpoint);
    console.log(response.data); // You should access the data property of the response
    return response.data;
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error to handle it in the caller function if needed
  }
};


export const addCard = async (endpoint, data) => {
    const headers = {
        "Content-Type": "application/json",
    };
    try {
        const response = await axios.post(endpoint, data, {headers});
        console.log(response.data); // You should access the data property of the response
        return response.data;

    } catch (error) {
        console.error(error);
        throw error; // Re-throw the error to handle it in the caller function if needed
    }
    
}
