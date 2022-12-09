import axios from "./axios";

export const userStats = async () => {
  const response = await axios.get("v1/user/stat");
  return response;
};
