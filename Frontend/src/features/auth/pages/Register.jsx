"use client";

import React, { useState } from "react";
import { register as registerUser } from "../service/auth.api";
import { Link } from "react-router";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const response = await registerUser(formData);

      if (response.success) {
        setSuccess("Account created! Check your email.");
        setFormData({ email: "", username: "", password: "" });
      } else {
        setError(response.message || "Failed to register");
      }
    } catch (err) {
      setError(err.message || "Failed to register");
    } finally {
      setIsLoading(false);
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
          <h1 className="text-3xl font-bold text-[#02C173]">Create Account</h1>

          {/* ERROR */}
          {error && (
            <div className="mb-3 text-sm bg-red-500/10 border border-red-500 text-red-400 px-3 py-2 rounded">
              {error}
            </div>
          )}

          {/* SUCCESS */}
          {success && (
            <div className="mb-3 text-sm bg-green-500/10 border border-green-500 text-green-400 px-3 py-2 rounded">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* EMAIL */}
            <div>
              <label className="text-sm text-gray-300">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="example@gmail.com"
                className="w-full mt-2 px-4 py-2 rounded-xl bg-transparent border border-[#02C173]/40 text-white placeholder-gray-500 focus:outline-none focus:border-[#02C173] focus:shadow-[0_0_15px_rgba(2,193,115,0.5)]"
              />
            </div>

            {/* USERNAME */}
            <div>
              <label className="text-sm text-gray-300">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="Choose a username"
                className="w-full mt-2 px-4 py-2 rounded-xl bg-transparent border border-[#02C173]/40 text-white placeholder-gray-500 focus:outline-none focus:border-[#02C173] focus:shadow-[0_0_15px_rgba(2,193,115,0.5)]"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-sm text-gray-300">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••"
                className="w-full mt-2 px-4 py-2 rounded-xl bg-transparent border border-[#02C173]/40 text-white placeholder-gray-500 focus:outline-none focus:border-[#02C173] focus:shadow-[0_0_15px_rgba(2,193,115,0.5)]"
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 rounded-xl bg-[#02C173] text-black font-semibold hover:scale-105 transition shadow-[0_10px_30px_rgba(2,193,115,0.5)] disabled:opacity-50"
            >
              {isLoading ? "Creating..." : "Sign Up"}
            </button>
          </form>
          <p className="text-sm text-gray-400 mt-4 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-[#02C173] hover:underline">
              Sign in
            </Link>
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-1/2 flex items-center justify-center border-l border-[#02C173]/10">
          <img
            src="https://res.cloudinary.com/ddcg0rzlo/image/upload/v1651418249/new-nft_tlfisy.png"
            alt="visual"
            className="absolute right-23 w-[325px] hover:scale-105 transition"
          />
          {/* SOCIAL ICON STACK */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4">
            {/* GOOGLE */}
            <button className="w-10 h-10 rounded-full bg-[#02C173] flex items-center justify-center shadow-md hover:scale-110 hover:shadow-[0_0_20px_rgba(2,193,115,0.7)] transition">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
                className="w-5"
                alt="google"
              />
            </button>

            {/* GITHUB */}
            <button className="w-10 h-10 rounded-full bg-[#02C173] flex items-center justify-center shadow-md hover:scale-110 hover:shadow-[0_0_20px_rgba(2,193,115,0.7)] transition">
              <img
                src="https://cdn-icons-png.flaticon.com/512/733/733553.png"
                className="w-5 invert"
                alt="github"
              />
            </button>

            {/* X (TWITTER) */}
            <button className="w-10 h-10 rounded-full bg-[#02C173] flex items-center justify-center shadow-md hover:scale-110 hover:shadow-[0_0_20px_rgba(2,193,115,0.7)] transition">
              <img
                src="https://cdn-icons-png.flaticon.com/512/733/733579.png"
                className="w-5"
                alt="x"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
