import React, { useState } from "react";
import { useRegisterMutation } from "../redux/api/authApi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import user_icon from "../assets/user_icon.png"; // Ensure this path is correct
import { FaPlus } from "react-icons/fa";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profileImageUrl: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  const handleImageUpload = async () => {
    if (!imageFile) return "";
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const res = await axios.post(
        "http://localhost:5001/api/v1/user/upload-image",
        formData
      );
      return res.data.imageUrl;
    } catch (err) {
      console.error("Image upload failed:", err);
      toast.error("Image upload failed");
      return "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let uploadedImageUrl = "";

    if (imageFile) {
      uploadedImageUrl = await handleImageUpload();
    }

    try {
      const res = await register({
        ...formData,
        profileImageUrl: uploadedImageUrl,
      }).unwrap();

      toast.success("Verification code sent!");
      navigate(`/otp-verification/${formData.email}`);
    } catch (err) {
      console.error("Registration failed:", err);
      toast.error(err?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="bg-white max-w-72 p-8 rounded-lg shadow-md w-full sm:max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        <div className="flex justify-center mb-6 relative">
          <div className="relative w-24 h-24 rounded-full overflow-hidden">
            <img
              src={imagePreview || user_icon}
              alt="Profile"
              className="w-full h-full object-cover"
            />
            <label className="absolute bottom-2 right-3 bg-blue-500 p-1 rounded-full cursor-pointer">
              <FaPlus className="text-white text-xs" />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setImageFile(file);
                  if (file) {
                    setImagePreview(URL.createObjectURL(file));
                  }
                }}
                className="hidden"
              />
            </label>
          </div>
        </div>
        <input
          type="text"
          placeholder="Name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 cursor-pointer"
          disabled={isLoading}
        >
          {isLoading ? "Registering..." : "Register"}
        </button>

        <Link to={"/login"}>
          <p className="text-sm py-2 text-gray-600 text-center">
            Already have an account?{" "}
            <span className="text-blue-500 underline cursor-pointer">
              Login
            </span>
          </p>
        </Link>
      </form>
    </div>
  );
};

export default RegisterPage;
