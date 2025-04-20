import { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaCommentDots,
  FaPaperPlane,
} from "react-icons/fa";
import axios from "axios";
import toast, {Toaster} from "react-hot-toast";


export default function Contact() {
  const [contactmsg, setContactmsg] = useState({
    name: "",
    email: "",
    query: "",
  });

  const [submitted, setSubmitted] = useState(false);

  function querySubmit() {
    const toastId = toast.loading("Sending your message...", {
      style: { background: "#facc15", color: "black" }, // yellow-500
    });
  
    axios.post("https://loan-fy-server-git-main-dhineshkumars-projects.vercel.app/contact-msg", contactmsg)
      .then(() => {
        toast.dismiss(toastId);
        toast.success("Message sent successfully!", {
          style: { background: "#4ade80", color: "black" }, // green-400
        });
        setSubmitted(true);
      })
      .catch((err) => {
        toast.dismiss(toastId);
        console.error("Error sending message:", err);
        toast.error("Something went wrong", {
          style: { background: "#f87171", color: "black" }, // red-400
        });
      });
  
    console.log(contactmsg);
  }

  return (
    <div className="py-10 px-4 md:px-20 text-gray-800 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-yellow-500 mb-6 animate-fade-in">
          Let's Talk
        </h1>
        <p className="text-gray-600 text-base md:text-lg max-w-xl mx-auto animate-pulse">
          📬 We're here to help! Fill in your details and we’ll get back to you
          as soon as possible.
        </p>
      </div>

      <form
        className="max-w-2xl mx-auto bg-white p-4 flex flex-col gap-6"
        onSubmit={(event) => {
          event.preventDefault();
          querySubmit();
        }}
      >
        {/* Name */}
        <div className="flex flex-col gap-2 w-full relative">
          <label className="text-blue-700 text-sm font-medium px-2">
            Full Name
          </label>
          <div className="relative w-full">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400">
              <FaUser />
            </span>
            <input
              className="border-2 border-blue-100 pl-10 p-3 rounded-lg placeholder:italic w-full focus:outline-none focus:border-blue-400 transition"
              placeholder="John Doe"
              type="text"
              required
              onChange={(e) =>
                setContactmsg({ ...contactmsg, name: e.target.value })
              }
            />
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2 w-full">
          <label className="text-blue-700 text-sm font-medium px-2">
            Email Address
          </label>
          <div className="relative w-full">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400">
              <FaEnvelope />
            </span>
            <input
              className="border-2 border-blue-100 pl-10 p-3 rounded-lg placeholder:italic w-full focus:outline-none focus:border-blue-400 transition"
              placeholder="you@example.com"
              type="email"
              required
              onChange={(e) =>
                setContactmsg({ ...contactmsg, email: e.target.value })
              }
            />
          </div>
        </div>

        {/* Query */}
        <div className="flex flex-col gap-2 w-full">
          <label className="text-blue-700 text-sm font-medium px-2">Query</label>
          <div className="relative w-full">
            <span className="absolute left-3 top-4 text-blue-400">
              <FaCommentDots />
            </span>
            <textarea
              className="border-2 border-blue-100 pl-10 p-3 rounded-lg placeholder:italic w-full h-40 focus:outline-none focus:border-blue-400 transition"
              placeholder="Your message..."
              required
              onChange={(e) =>
                setContactmsg({ ...contactmsg, query: e.target.value })
              }
            />
          </div>
        </div>

        {/* Button */}
        <button
          className="self-center flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 px-8 py-3 rounded-full text-white text-lg font-semibold hover:from-yellow-500 hover:to-yellow-600 transition duration-300 shadow-md hover:scale-105"
          type="submit"
        >
          <FaPaperPlane className="animate-bounce" />
          Submit
        </button> <Toaster/>

        {/* Confirmation */}
        {submitted && (
          <p className="text-green-600 font-medium text-center">
            ✅ Your message has been sent!
          </p>
        )}
      </form>
    </div>
  );
}
