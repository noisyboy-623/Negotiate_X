import axios from "axios";

const api = axios.create({
  // baseURL: "https://negotiate-x-backend.onrender.com",
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export async function getMe() {
    const response = await api.get("/api/auth/get-me")
    return response.data
}
