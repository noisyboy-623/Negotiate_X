import axios from "axios";

const api = axios.create({
  baseURL: "https://negotiate-x-backend.onrender.com",
// baseURL: "http://localhost:3000",
  withCredentials: true,
});

// 🔥 reusable error handler
const handleError = (err) => {
  return (
    err.response?.data?.message || // backend message
    err.response?.data?.err ||     // fallback
    err.message ||                 // axios fallback
    "Something went wrong"
  );
};

export async function register({ email, username, password }) {
  try {
    const response = await api.post("/api/auth/register", {
      email,
      username,
      password,
    });

    return response.data;
  } catch (err) {
    console.log("AXIOS ERROR:", err); // keep this for debugging

    const message =
      err.response?.data?.message ||   // ✅ backend message
      err.response?.data?.err ||       // fallback
      "Something went wrong";

    throw new Error(message); // ✅ THIS is the key fix
  }
}

export async function login({ email, password }) {
  try {
    const response = await api.post("/api/auth/login", {
      email,
      password,
    });
    return response.data;
  } catch (err) {
    throw new Error(handleError(err));
  }
}

export async function getMe() {
  try {
    const response = await api.get("/api/auth/get-me");
    return response.data;
  } catch (err) {
    throw new Error(handleError(err));
  }
}

export async function logout() {
  try {
    const response = await api.get("/api/auth/logout");
    return response.data;
  } catch (err) {
    throw new Error(handleError(err));
  }
}