import { useState } from "react";
import login from "../assets/login.png";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function SignInPage() {
  const [values, setValues] = useState({
    userid: "",
    password: "",
  });

  const Navigate = useNavigate();

  async function signinvalidate(e) {
    e.preventDefault();

    const toastId = toast.loading("Signing in...", {
      style: { background: "#facc15", color: "black" }, // yellow-500
    });

    try {
      const res = await axios.post("http://localhost:8000/signin", {
        userid: values.userid,
        password: values.password,
      });

      toast.dismiss(toastId);
      console.log(res.data.userid);

      if (res.data.message === "Login successful") {
        localStorage.setItem("userId", res.data.userid);
        Cookies.set("userId", res.data.userid, { expires: 7 });

        toast.success("Signed in successfully!", {
          style: { background: "#4ade80", color: "black" }, // green-400
        });

        setTimeout(() => {
          Navigate("/home");
        }, 1500); // short delay to let user see the toast
      } else {
        toast.error("Invalid credentials. Please try again.", {
          style: { background: "#facc15", color: "black" }, // yellow-500
        });
      }
    } catch (error) {
      toast.dismiss(toastId);
      console.error("Error:", error);
      toast.error("Enter a valid User ID and Password.", {
        style: { background: "#f87171", color: "black" }, // red-400
      });
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-indigo-500 p-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Side - Just the Image */}
        <div className="md:w-1/2 w-full bg-white">
          <img
            src={login}
            alt="Login Visual"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side - Login Form + Welcome Text */}
        <div className="md:w-1/2 w-full p-10 flex flex-col justify-center">
          <div className="text-center mb-6 text-blue-600">
            <h2 className="text-2xl font-semibold text-blue-600 mb-1">
              Welcome Back 👋
            </h2>
            <p className="animate-pulse text-red-500">
              Check your email for your User ID
            </p>
          </div>

          <form className="space-y-4" onSubmit={signinvalidate}>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1 px-1">
                User ID
              </label>
              <input
                type="text"
                placeholder="User ID"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                onInvalid={(e) =>
                  e.target.setCustomValidity("Please enter the User ID")
                }
                onInput={(e) => e.target.setCustomValidity("")}
                onChange={(e) =>
                  setValues({ ...values, userid: e.target.value })
                }
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1 px-1">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                onInvalid={(e) =>
                  e.target.setCustomValidity(
                    "Please enter the correct password"
                  )
                }
                onInput={(e) => e.target.setCustomValidity("")}
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
              />
            </div>

            {/* <div className="flex justify-center items-center text-sm text-gray-600">
              <Link to="/forgotpw" className="text-blue-500 !no-underline">
                Forgot password?
              </Link>
            </div> */}

            <button
              type="submit"
              className="w-full bg-yellow-500 text-white py-2 rounded-full hover:bg-yellow-600 font-semibold transition"
            >
              Sign In
            </button>
            <Toaster />
          </form>

          <div className="mt-2 space-y-2 text-center text-sm text-gray-600">
            <p>
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="text-blue-600 font-medium hover:underline"
              >
                Create one here
              </Link>
            </p>
            <p>
              Are you an admin?{" "}
              <Link
                to="/adminlogin"
                className="text-blue-600 font-medium hover:underline"
              >
                Login as Admin
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
