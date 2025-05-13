import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useVerifyOtpMutation } from "../redux/api/authApi";
import { toast } from "react-toastify";

const OtpVerificationPage = () => {
  const { email } = useParams();
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const [verifyOtp] = useVerifyOtpMutation();

  const handleVerify = async () => {
    try {
      const res = await verifyOtp({ email, otp }).unwrap();
      toast.success("OTP Verified Successfully!");

      navigate("/");
      console.log(res);
    } catch (error) {
      toast.error(error?.data?.message || "OTP Verification failed.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-72 sm:max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          OTP Verification
        </h2>
        <p className="mb-2 text-center text-gray-600">
          Enter the OTP sent to: <strong>{email}</strong>
        </p>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
        />
        <button
          onClick={handleVerify}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 cursor-pointer"
        >
          Verify
        </button>
      </div>
    </div>
  );
};

export default OtpVerificationPage;
