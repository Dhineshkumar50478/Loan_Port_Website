import React, { useState } from "react";
import forgotpw from "../assets/forgotpw.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1); // 1: Send OTP, 2: Verify OTP, 3: Reset Password
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://loan-fy-server-git-main-dhineshkumars-projects.vercel.app/send-otp", { email });
      showMessage(res.data.message || "OTP sent successfully!");
      setStep(2);
    } catch (err) {
      showMessage(err.response?.data?.message || "Failed to send OTP.");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://loan-fy-server-git-main-dhineshkumars-projects.vercel.app/verify-otp", { email, otp });
      showMessage(res.data.message || "OTP verified successfully!");
      setStep(3);
    } catch (err) {
      showMessage(err.response?.data?.message || "Invalid or expired OTP.");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      showMessage("Passwords do not match.");
      return;
    }

    try {
      const res = await axios.post("https://loan-fy-server-git-main-dhineshkumars-projects.vercel.app/update-password", {
        email,
        newPassword,
      });

      showMessage(res.data.message || "Password reset successful!");

      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      showMessage(err.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-indigo-500 p-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Side Image */}
        <div className="md:w-1/2 w-full">
          <img src={forgotpw} alt="Forgot Password" className="w-full h-full object-cover" />
        </div>

        {/* Right Side Form */}
        <div className="md:w-1/2 w-full p-10 flex flex-col justify-center">
          <div className="text-center mb-6 text-blue-600">
            <h2 className="text-2xl font-semibold">Reset Your Password 🔐</h2>
          </div>

          {message && (
            <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-2 rounded text-sm mb-4">
              {message}
            </div>
          )}

<form
  className="space-y-4"
  onSubmit={
    step === 1
      ? handleSendOtp
      : step === 2
      ? handleVerifyOtp
      : handleResetPassword
  }
>
  {step === 1 && (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
      <input
        type="email"
        placeholder="you@example.com"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
    </div>
  )}

  {step === 2 && (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Enter OTP</label>
        <input
          type="text"
          placeholder="Enter OTP"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
      </div>
    </>
  )}

  {step === 3 && (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
        <input
          type="password"
          placeholder="Enter new password"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
        <input
          type="password"
          placeholder="Re-enter password"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
    </>
  )}

  <button
    type="submit"
    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
  >
    {step === 1 ? "Send OTP" : step === 2 ? "Verify OTP" : "Reset Password"}
  </button>
</form>


          <p className="text-center text-sm text-gray-600 mt-4">
            Remembered your password?{" "}
            <Link to="/login" className="text-blue-500 !no-underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
