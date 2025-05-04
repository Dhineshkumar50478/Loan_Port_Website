import { useState } from "react";
import login from "../assets/login.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (email !== "loaneaseofficial@gmail.com") {
      toast.error("You are not an admin!", {
        style: { background: "#facc15", color: "black" },
      });
      return;
    }

    try {
      setLoading(true);
      await axios.post("http://localhost:8000/api/admin/send-otp", { email });
      setOtpSent(true);
      toast.success("OTP sent to admin email!", {
        style: { background: "#4ade80", color: "black" },
      });
    } catch (err) {
      toast.error("Failed to send OTP. Try again.", {
        style: { background: "#f87171", color: "black" },
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:8000/api/admin/verify-otp", {
        email,
        otp,
      });

      if (res.data.success) {
        toast.success("OTP Verified!", {
          style: { background: "#4ade80", color: "black" },
        });
        setTimeout(() => navigate("/admin"), 1500);
      } else {
        toast.error("Invalid or expired OTP!", {
          style: { background: "#f87171", color: "black" },
        });
      }
    } catch (err) {
      toast.error("Error verifying OTP.", {
        style: { background: "#f87171", color: "black" },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-indigo-500 p-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Image */}
        <div className="md:w-1/2 w-full bg-white">
          <img
            src={login}
            alt="Login Visual"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side Form */}
        <div className="md:w-1/2 w-full p-10 flex flex-col justify-center">
          <div className="text-center mb-6 text-blue-600">
            <h2 className="text-2xl font-semibold text-blue-600 mb-1">
              Admin Login 🚀
            </h2>
            <p className="animate-pulse text-red-500">
              Only for authorized admin use
            </p>
          </div>

          {!otpSent ? (
            <form className="space-y-4" onSubmit={handleSendOtp}>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1 px-1">
                  Admin Email
                </label>
                <input
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-yellow-500 text-white py-2 rounded-full hover:bg-yellow-600 font-semibold transition"
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
              <Toaster />
            </form>
          ) : (
            <form className="space-y-4" onSubmit={handleVerifyOtp}>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1 px-1">
                  Enter OTP
                </label>
                <input
                  type="text"
                  placeholder="6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-yellow-500 text-white py-2 rounded-full hover:bg-yellow-600 font-semibold transition"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
              <Toaster />
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
