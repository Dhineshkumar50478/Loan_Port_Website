import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaGraduationCap,
  FaBriefcase,
  FaRupeeSign,
  FaTransgender,
  FaEdit,
  FaSave,
  FaSignOutAlt,
} from "react-icons/fa";
import { HiOutlineCake } from "react-icons/hi";

const ViewProfile = () => {
  const [userId, setUserId] = useState("");
  const [profile, setProfile] = useState(null);
  const [editable, setEditable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editedProfile, setEditedProfile] = useState({});
  const [profileLoaded, setProfileLoaded] = useState(false); // Track if the profile is loaded
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
      fetchProfile(storedUserId);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const fetchProfile = async (userId) => {
    toast.dismiss(); // Clear any previous toasts
    const toastId = toast.loading("Loading profile...", {
      style: { backgroundColor: "#facc15", color: "#000" },
    });
  
    setLoading(true);
  
    setTimeout(() => {
      axios.get(`https://loan-fy-server-git-main-dhineshkumars-projects.vercel.app/get_user/${userId}`)
        .then((res) => {
          if (res.data) {
            setProfile(res.data);
            setEditedProfile(res.data);
            setProfileLoaded(true);
  
            toast.success("Profile loaded successfully!", {
              id: toastId, // Replaces loading toast
              style: { backgroundColor: "#facc15", color: "#000" },
            });
          } else {
            toast.error("User ID does not exist.", {
              id: toastId, // Replaces loading toast
              style: { backgroundColor: "#facc15", color: "#000" },
            });
          }
        })
        .catch(() => {
          toast.error("Failed to fetch profile. Try again!", {
            id: toastId, // Replaces loading toast
            style: { backgroundColor: "#facc15", color: "#000" },
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }, 2000); // Simulated delay of 2 seconds
  };
  

  const handleEditToggle = () => setEditable(!editable);

  const handleInputChange = (field, value) => {
    setEditedProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    const mandatoryFields = [
      "Name",
      "DOB",
      "Age",
      "Gender",
      "Maritial_Status",
      "Dependents",
      "Education",
      "Employment_Status",
      "Total_Income",
      "Residential_Status",
      "Rent_Amount",
      "Cibil_Score",
      "Contact_No",
      "Address",
    ];

    for (const field of mandatoryFields) {
      if (
        !editedProfile[field] ||
        editedProfile[field].toString().trim() === ""
      ) {
        toast.error(`Field "${field}" is required`, {
          style: { backgroundColor: "#facc15", color: "#000" },
        });
        return;
      }
    }

    const toastId = toast.loading("Saving profile...", {
      style: { backgroundColor: "#facc15", color: "#000" },
    });

    try {
      await axios.put("https://loan-fy-server-git-main-dhineshkumars-projects.vercel.app/update_profile", editedProfile);
      toast.success("Profile saved successfully!", {
        id: toastId, // Ensure only this toast ID is used
        style: { backgroundColor: "#facc15", color: "#000" },
      });
      setProfile(editedProfile);
      setEditable(false);
    } catch (error) {
      toast.error("Failed to update profile.", {
        id: toastId, // Ensure only this toast ID is used
        style: { backgroundColor: "#facc15", color: "#000" },
      });
    }
  };

  const handleLogout = async () => {
    toast.dismiss(); // Dismiss any previous toasts
    const toastId = toast.loading("Logging out...", {
      style: { backgroundColor: "#facc15", color: "#000" },
    });

    localStorage.removeItem("userId");

    setTimeout(() => {
      toast.success("Logged out successfully!", {
        id: toastId, // Ensure only this toast ID is used
        style: { backgroundColor: "#facc15", color: "#000" },
      });
      navigate("/login");
    }, 1000); // Simulate a delay to show the loading toast for a moment
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-100 py-10 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 bg-white rounded-2xl shadow-xl p-6 md:p-10">
        {/* Left Panel */}
        <div className="w-full md:w-1/3 border-r-2 border-gray-300 pr-6">
          <h2 className="text-3xl font-bold text-blue-600 mb-6">
            View & Edit Profile
          </h2>

          {/* Profile Summary Section */}
          {profile ? (
            <div className="mt-10">
              <h3 className="text-xl font-semibold text-yellow-500 mb-4">
                Profile Summary
              </h3>
              <div className="space-y-4 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <FaUser className="text-blue-600" />
                  <span className="font-medium">Name:</span> {profile.Name}
                </div>
                <div className="flex items-center gap-2">
                  <FaTransgender className="text-pink-600" />
                  <span className="font-medium">Gender:</span> {profile.Gender}
                </div>
                <div className="flex items-center gap-2">
                  <FaGraduationCap className="text-green-600" />
                  <span className="font-medium">Education:</span>{" "}
                  {profile.Education}
                </div>
                <div className="flex items-center gap-2">
                  <FaBriefcase className="text-purple-600" />
                  <span className="font-medium">Employment:</span>{" "}
                  {profile.Employment_Status}
                </div>
                <div className="flex items-center gap-2">
                  <FaRupeeSign className="text-yellow-600" />
                  <span className="font-medium">Income Per Month:</span> ₹
                  {profile.Total_Income}
                </div>
              </div>
            </div>
          ) : loading ? (
            <div className="animate-pulse">
              <div className="h-6 bg-gray-300 mb-4 w-2/3"></div>
              <div className="h-4 bg-gray-300 mb-2 w-1/2"></div>
              <div className="h-4 bg-gray-300 mb-2 w-3/4"></div>
              <div className="h-4 bg-gray-300 mb-2 w-2/3"></div>
              <div className="h-4 bg-gray-300 mb-2 w-3/4"></div>
            </div>
          ) : (
            <div className="h-6 text-gray-500">Loading...</div>
          )}
        </div>

        {/* Right Panel */}
        <div className="w-full md:w-2/3">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-blue-600">
              Profile Details
            </h3>
            {profile &&
              (editable ? (
                <button
                  onClick={handleSave}
                  className="bg-yellow-500 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-yellow-600"
                >
                  <FaSave /> Save
                </button>
              ) : (
                <button
                  onClick={handleEditToggle}
                  className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700"
                >
                  <FaEdit /> Edit
                </button>
              ))}
          </div>

          {profile && (
            <div className="space-y-4">
              {Object.entries(profile).map(([key, value]) => {
                if (
                  [
                    "user_id",
                    "_id",
                    "__v",
                    "Loan_Amount",
                    "Loan_Term",
                    "Existing_EMI",
                    "Loan_Type",
                    "Password",
                    "Loan_Status",
                    "Loan_Emi",
                  ].includes(key)
                )
                  return null;
                return (
                  <div key={key}>
                    <label className="block text-sm font-semibold capitalize">
                      {key.replace(/_/g, " ")}:
                    </label>
                    {editable ? (
                      <input
                        type={typeof value === "number" ? "number" : "text"}
                        value={editedProfile[key] ?? ""}
                        onChange={(e) => handleInputChange(key, e.target.value)}
                        className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      />
                    ) : (
                      <p className="text-gray-800">{value}</p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Logout Button */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white py-2 px-6 rounded-full hover:bg-red-700 flex items-center gap-2"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>

      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
};

export default ViewProfile;
