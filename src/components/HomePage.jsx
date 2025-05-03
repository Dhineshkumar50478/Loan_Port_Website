import { useState } from "react";
import eligiblity from "../assets/Eligibility.png";
import home_loan from "../assets/home_loan.png";
import education_loan from "../assets/education_loan.png";
import vehicle_loan from "../assets/vehicle_loan.png";
import personal_loan from "../assets/personal_loan.png";
import gold_loan from "../assets/gold_loan.png";
import { FaCheckCircle, FaFileAlt, FaSearch, FaThumbsUp } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const [loan_data, setLoan_data] = useState({
    user_id: "",
    loan_type: "",
    loan_amount: 0,
    loan_term: 0,
    existing_emi: 0,
  });

  const loan_types = [
    {
      title: "Home Loan",
      description: "Make your dream home a reality.",
      image: home_loan,
      in_rate:'8.75%',
    },
    {
      title: "Education Loan",
      description: "Empowering your academic journey.",
      image: education_loan,
      in_rate:'9.5%',
    },
    {
      title: "Vehicle Loan",
      description: "Drive your dream vehicle with ease.",
      image: vehicle_loan,
      in_rate:'9.25%',
    },
    {
      title: "Personal Loan",
      description: "For your urgent personal needs.",
      image: personal_loan,
      in_rate:'12.5%',
    },
    {
      title: "Gold Loan",
      description: "Unlock the value of your gold instantly.",
      image: gold_loan,
      in_rate:'9%',
    },
  ];

  const steps = [
    {
      icon: (
        <div className="bg-blue-100 rounded-full p-4">
          <FaSearch className="text-blue-600 text-3xl" />
        </div>
      ),
      title: "Check Eligibility",
      description: "Quickly check if you qualify in just a few steps.",
    },
    {
      icon: (
        <div className="bg-green-100 rounded-full p-4">
          <FaFileAlt className="text-green-600 text-3xl" />
        </div>
      ),
      title: "Apply for a Loan",
      description: "Submit your application with the required documents.",
    },
    {
      icon: (
        <div className="bg-yellow-100 rounded-full p-4">
          <FaCheckCircle className="text-yellow-500 text-3xl" />
        </div>
      ),
      title: "Document Verification",
      description: "Our team carefully validates your submitted details.",
    },
    {
      icon: (
        <div className="bg-purple-100 rounded-full p-4">
          <FaThumbsUp className="text-purple-600 text-3xl" />
        </div>
      ),
      title: "Loan Approval",
      description: "Once verified, your loan gets approved swiftly.",
    },
  ];

  const loan_data_transfer = async () => {
    toast.dismiss(); // Clear any old toasts

    // Show loading toast immediately
    const toastId = toast.loading("Checking eligibility...", {
      style: { backgroundColor: "#facc15", color: "#000" },
    });

    setLoading(true); // Show spinner in button

    try {
      console.log(loan_data);

      // Step 1: Store loan data
      await axios.post("http://localhost:8000/update_loan", loan_data);

      // Step 2: Fetch complete user profile
      const res = await axios.get(
        `http://localhost:8000/get_user/${loan_data.user_id}`
      );
      const fullProfile = res.data;

      // Step 3: Filter values
      const {
        user_id,
        _id,
        __v,
        Address,
        Contact_No,
        DOB,
        Name,
        Email,
        ...eli_values
      } = fullProfile;

      console.log("elivalues",eli_values);

      // Step 4: Call eligibility check with toastId
      checkEligiblity(eli_values, user_id, toastId);
    } catch (error) {
      console.error(
        "Error during loan data transfer or eligibility check:",
        error
      );
      toast.error("Something went wrong. Please try again!", {
        id: toastId,
        style: { backgroundColor: "#f87171", color: "#fff" },
      });
      setLoading(false);
    }
  };

  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkEligiblity = async (eli_values, user_id, toastId) => {
    try {
      const res = await axios.post(
        "https://loan-backendpy.onrender.com/api/predict",
        eli_values
      );
      setResponse(res.data);
      
      var loan_emi = res.data.loan_emi;

      if (res.data.status === "Approved") {
        toast.success('🎉 You are Eligible', {
          id: toastId,
          style: { backgroundColor: "#4ade80", color: "#000" },
        });
        navigate("/documentsub", { state: { user_id,loan_emi } });
      } else if (res.data.status === "Rejected") {
        const reasons = res.data.reasons?.join("\n ") || "Unknown reason";
        toast.error(`❌ You're not eligible.\n${reasons}`, {
          id: toastId,
          style: { backgroundColor: "#f87171", color: "#fff" },
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Eligibility check failed!", {
        id: toastId,
        style: { backgroundColor: "#f87171", color: "#fff" },
      });
    } finally {
      setLoading(false); // Stop button spinner
    }
  };

  const firstEligibility = () => {
    console.log("Toast is fine");
    toast("First Check Loan Eligibility", {
      icon: "👆",
    });
  };

  return (
    <>
      <div className="flex flex-col md:flex-row">
        {/* Left Side */}
        <div className="w-full md:w-1/2 bg-blue-600 flex flex-col items-center justify-center p-6 md:rounded-r-full rounded-none">
          <img
            src={eligiblity}
            alt="Loan Visual"
            className="w-[80%] max-w-xs md:max-w-md object-contain mb-4"
          />
          <p className="text-xl md:text-2xl font-bold text-yellow-400 text-center">
            Eligibility Check
          </p>
          {response && (
            <div>
              <h3>Status: {response.status}</h3>
              <p>Probability: {response.probability}</p>
              {response.reasons?.length > 0 && (
                <div>
                  <h4>Rejection Reasons:</h4>
                  <ul>
                    {response.reasons.map((reason, idx) => (
                      <li key={idx}>{reason}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Side - Form */}
        <div className="md:w-1/2 w-full flex items-center justify-center p-8 bg-white">
          <form
            className="w-full max-w-md bg-white p-6 space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              loan_data_transfer();
            }}
          >
            <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
              Check your Eligiblity
            </h2>

            <div>
              <label className="block font-medium text-gray-700 mb-1">
                User ID
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2"
                onChange={(e) =>
                  setLoan_data({ ...loan_data, user_id: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Choose Loan Type
              </label>
              <select
                className="w-full border border-gray-300 rounded px-3 py-2"
                onChange={(e) =>
                  setLoan_data({ ...loan_data, loan_type: e.target.value })
                }
                required
              >
                <option value="">Select here</option>
                <option>Home Loan</option>
                <option>Education Loan</option>
                <option>Vehicle Loan</option>
                <option>Personal Loan</option>
                <option>Gold Loan</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Loan Amount
              </label>
              <input
                type="number"
                max="1000000"
                className="w-full border border-gray-300 rounded px-3 py-2"
                onChange={(e) =>
                  setLoan_data({
                    ...loan_data,
                    loan_amount: Number(e.target.value),
                  })
                }
                required
                onInvalid={(e) =>
                  e.target.setCustomValidity("Loan limit is 10 Lakh")
                }
                onInput={(e) => e.target.setCustomValidity("")}
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Loan Tenure (in months)
              </label>
              <input
                type="number"
                max="100"
                className="w-full border border-gray-300 rounded px-3 py-2"
                onChange={(e) =>
                  setLoan_data({
                    ...loan_data,
                    loan_term: Number(e.target.value),
                  })
                }
                required
                onInvalid={(e) =>
                  e.target.setCustomValidity("Loan Tenure is Maximum 100 Months")
                }
                onInput={(e) => e.target.setCustomValidity("")}
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Existing EMI (per month)
              </label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded px-3 py-2"
                onChange={(e) =>
                  setLoan_data({
                    ...loan_data,
                    existing_emi: Number(e.target.value),
                  })
                }
              />
            </div>

            <div className="text-center my-6">
              <center>
                <button
                  type="submit"
                  className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 cursor-pointer transition flex items-center justify-center gap-2"
                  disabled={loading}
                >
                  {loading ? (
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                  ) : (
                    "Check Eligibility"
                  )}
                </button>
              </center>
            </div>
          </form>
        </div>
      </div>

      {/* loan types section */}
      <div className="p-4">
        <p className="text-2xl font-bold text-center text-blue-600 mb-2">
          Explore Our Loan Products
        </p>

        {/* Mobile Swipe Instruction */}
        <p className="text-sm text-gray-500 text-center mb-4 animate-pulse">
          👈 Swipe or scroll to view more loan options 👉
        </p>

        <div
          className="overflow-x-auto"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <div
            className="flex gap-6 w-max p-2 snap-x snap-mandatory"
            style={{
              WebkitOverflowScrolling: "touch",
            }}
          >
            {loan_types.map((i, j) => (
              <div
                key={j}
                className="w-[340px] flex-shrink-0 snap-start bg-white rounded-2xl shadow-xl shadow-blue-100 p-6 flex flex-col items-center text-center space-y-3 transition duration-300 hover:scale-[1.02]"
              >
                <div className="bg-blue-50 rounded-full p-4">
                  <img
                    src={i.image}
                    alt={i.title}
                    className="w-28 h-26 object-contain"
                  />
                </div>
                <h3 className="text-2xl font-semibold text-blue-600">
                  {i.title}
                </h3>
                <p className="text-gray-600 text-sm"><span className="text-red-600 font-bold">Base Interest Rate is {i.in_rate}</span><br/>{i.description}</p>
                <button
                  className="mt-auto px-6 py-2.5 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition duration-300"
                  onClick={() => {
                    firstEligibility();
                  }}
                >
                  Apply Now
                </button>
              </div>
            ))}
            <Toaster />
          </div>
        </div>

        {/* Hide Scrollbar Across Browsers */}
        <style>
          {`
      div::-webkit-scrollbar {
        display: none;
      }
    `}
        </style>
      </div>
      <div>
        <section className="py-10">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-center text-blue-600 mb-2">
              Your Loan Journey
            </h2>
            <p className="text-sm text-gray-500 text-center mb-4 animate-pulse">
              🚀 Getting your loan is simple and fast. Here's how it works
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="bg-white shadow-lg shadow-blue-100 rounded-2xl p-6 hover:shadow-xl transition duration-300 flex flex-col items-center w-full max-w-xs mx-auto sm:max-w-full"
                >
                  <div className="mb-4 flex justify-center">{step.icon}</div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2 text-blue-600">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 text-sm md:text-base text-center">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;
