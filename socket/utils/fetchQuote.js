import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const fetchQuote = async (difficulty) => {
  const endpoint = `${process.env.RANDOM_API_URL}/api/get/random/${difficulty}`;
  try {
    const response = await axios.get(endpoint);
    return response.data.text;

  } catch (error) {
    console.error("Failed to fetch quote :)");
  }
};
