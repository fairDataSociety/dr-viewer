import axios from "./axios";

export const userStats = async () => {
  const response = await axios.get("user/stat");
  return response;
};
