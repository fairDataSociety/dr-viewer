import axios from "./axios";

interface LoginData {
  userName: string;
  password: string;
}

interface LoginResponse {
  code: number;
  message: string;
}

export async function login(data: LoginData): Promise<LoginResponse> {
  return axios.post("v2/user/login", data);
}

export async function logout(): Promise<LoginResponse> {
  return axios.post("v1/user/logout");
}

export const userStats = async () => {
  const response = await axios.get("v1/user/stat");
  return response;
};
