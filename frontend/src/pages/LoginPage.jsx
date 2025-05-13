import React, { useState } from "react";
import { useLoginMutation } from "../redux/api/authApi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading, error }] = useLoginMutation();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      toast.success("Login successful!");
      navigate("/");
      console.log(res);
    } catch (err) {
      console.error("Login failed:", err);
      toast.error("Login failed:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="bg-white max-w-72 p-8 rounded-lg shadow-md w-full sm:max-w-md"
        onSubmit={handleLogin}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus\:outline-none focus\:ring-2 focus\:ring-blue-400"
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus\:outline-none focus\:ring-2 focus\:ring-blue-400"
        />{" "}
        <p className="text-sm text-right mb-4 text-blue-500 hover:underline">
          {" "}
          <Link to="/password/forgot">Forgot your password?</Link>{" "}
        </p>{" "}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition disabled:opacity-50 cursor-pointer"
        >
          {isLoading ? "Logging in..." : "Login"}{" "}
        </button>
        <Link to={"/register"}>
          <p className="text-sm py-2 text-gray-600">
            Don't have an account?{" "}
            <span className="text-blue-500 underline cursor-pointer">
              Register
            </span>
          </p>
        </Link>
        {error && (
          <p className="mt-4 text-red-500 text-sm">
            {error.data?.message || "Login failed"}{" "}
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPage;
