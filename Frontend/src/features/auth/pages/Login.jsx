import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router";
import { useSelector } from "react-redux";
import { useAuth } from "../hook/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);

  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  if (!loading && user) {
    return <Navigate to="/" replace />;
  }

  const submitForm = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await handleLogin({ email, password });
      navigate("/");
    } catch (err) {
      setError(err.message || "Failed to login");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#060707] text-white overflow-hidden">
      {/* BACKGROUND GLOW */}
      <div className="absolute h-[400px] w-[400px] bg-[#02C173] blur-[120px] opacity-20 -top-20 -left-20"></div>
      <div className="absolute h-[300px] w-[300px] bg-[#02C173] blur-[100px] opacity-10 bottom-0 right-0"></div>

      {/* MAIN CARD */}
      <div className="relative z-10 w-[900px] h-[500px] flex rounded-3xl overflow-hidden border border-[#02C173]/20 backdrop-blur-xl bg-white/5 shadow-2xl">
        {/* LEFT SIDE (FORM) */}
        <div className="w-1/2 flex flex-col justify-center px-12">
          <h1 className="text-3xl font-bold text-[#02C173]">Welcome back</h1>

          <p className="text-sm text-gray-400 mb-6">
            Please enter your details
          </p>

          {/* ERROR */}
          {error && (
            <div className="mb-4 text-sm bg-red-500/10 border border-red-500 text-red-400 px-3 py-2 rounded animate-shake">
              {error}
            </div>
          )}

          <form onSubmit={submitForm} className="space-y-4">
            {/* EMAIL */}
            <div>
              <label className="text-sm text-gray-300">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="w-full mt-2 px-4 py-2 rounded-xl bg-transparent border border-[#02C173]/40 text-white placeholder-gray-500 focus:outline-none focus:border-[#02C173] focus:shadow-[0_0_15px_rgba(2,193,115,0.5)] transition"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-sm text-gray-300">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="w-full mt-2 px-4 py-2 rounded-xl bg-transparent border border-[#02C173]/40 text-white placeholder-gray-500 focus:outline-none focus:border-[#02C173] focus:shadow-[0_0_15px_rgba(2,193,115,0.5)] transition"
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 rounded-xl bg-[#02C173] text-black font-semibold hover:scale-105 transition shadow-[0_10px_30px_rgba(2,193,115,0.5)] disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          {/* FOOTER */}
          <p className="text-sm text-gray-400 mt-6">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-[#02C173] cursor-pointer hover:underline"
            >
              Sign up
            </span>
          </p>
        </div>

        {/* RIGHT SIDE (VISUAL) */}
        <div className="w-1/2 flex items-center justify-center border-l border-[#02C173]/10">
          <img
            src="https://res.cloudinary.com/ddcg0rzlo/image/upload/v1651418249/new-nft_tlfisy.png"
            alt="visual"
            className="absolute right-13 w-[325px] hover:scale-105 transition"
          />
          {/* SOCIAL ICON STACK */}
          {/* <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4"> */}
            {/* GOOGLE */}
            {/* <button className="w-10 h-10 rounded-full bg-[#02C173] flex items-center justify-center shadow-md hover:scale-110 hover:shadow-[0_0_20px_rgba(2,193,115,0.7)] transition">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
                className="w-5"
                alt="google"
              />
            </button> */}

            {/* GITHUB */}
            {/* <button className="w-10 h-10 rounded-full bg-[#02C173] flex items-center justify-center shadow-md hover:scale-110 hover:shadow-[0_0_20px_rgba(2,193,115,0.7)] transition">
              <img
                src="https://cdn-icons-png.flaticon.com/512/733/733553.png"
                className="w-5 invert"
                alt="github"
              />
            </button> */}

            {/* X (TWITTER) */}
            {/* <button className="w-10 h-10 rounded-full bg-[#02C173] flex items-center justify-center shadow-md hover:scale-110 hover:shadow-[0_0_20px_rgba(2,193,115,0.7)] transition">
              <img
                src="https://cdn-icons-png.flaticon.com/512/733/733579.png"
                className="w-5"
                alt="x"
              />
            </button> */}
          {/* </div> */}
        </div>
      </div>

      {/* ANIMATIONS */}
      <style>{`
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        .animate-shake {
          animation: shake 0.4s ease;
        }
      `}</style>
    </div>
  );
};

export default Login;
