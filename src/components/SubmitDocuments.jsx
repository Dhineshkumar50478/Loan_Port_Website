import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import documentupload from "../assets/document_up.png";
import { useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";


export default function DocumentUploadCard() {
  const [aadhar, setAadhar] = useState(null);
  const [pan, setPan] = useState(null);
  const [employmentId, setEmploymentId] = useState(null);
  const [salarySlips, setSalarySlips] = useState(null);
  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();
  const user_id = location.state?.user_id;
  console.log(user_id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
  
    if (!aadhar) newErrors.aadhar = "Aadhar card is required";
    if (!pan) newErrors.pan = "PAN card is required";
    if (!employmentId) newErrors.employmentId = "Employment ID card is required";
    if (!salarySlips) newErrors.salarySlips = "Salary slip is required";
  
    setErrors(newErrors);
  
    if (Object.keys(newErrors).length === 0) {
      const formData = new FormData();
      formData.append("user_id", user_id);
      formData.append("aadhar", aadhar);
      formData.append("pan", pan);
      formData.append("employmentId", employmentId);
      formData.append("salarySlip", salarySlips); // Single file only
  
      const toastId = toast.loading("📤 Uploading your documents...");
  
      try {
        await fetch("https://loan-fy-server-git-main-dhineshkumars-projects.vercel.app/upload_documents", {
          method: "POST",
          body: formData,
        });
  
        toast.success("Documents uploaded successfully!", {
          id: toastId,
        });
        setShowPopup(true);
      } catch (error) {
        console.error("Upload failed:", error);
        toast.error("❌ Upload failed. Please try again.", {
          id: toastId,
        });
      }
    }
  };
  
  

  const handlePopupOk = () => {
    setShowPopup(false);
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden w-full max-w-5xl grid grid-cols-1 md:grid-cols-2">
        {/* Left Side */}
        <div className="bg-blue-600 hidden md:flex flex-col items-center justify-center p-6 space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-yellow-500">
            Document Submission
          </h2>
          <img
            src={documentupload}
            alt="Document Upload"
            className="max-h-[300px] w-auto object-contain"
          />
          <p className="text-sm md:text-base text-blue-100 text-center px-6 animate-pulse">
            📄 Upload all necessary documents to get your loan processed faster.
            🔒 We ensure 100% secure uploads.
          </p>
        </div>

        {/* Right Side - Form */}
        <div className="p-6 md:p-10">
          <div className="mb-6 p-4 bg-green-100 border border-green-400 rounded-md text-center">
            <h3 className="text-lg md:text-xl font-semibold text-green-700">
              🎉 Congratulations! You are eligible to apply for a loan
            </h3>
          </div>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-600 mb-4 text-center">
            Upload Your Documents
          </h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Aadhar */}
            <div>
              <label className="block text-sm md:text-base font-medium text-blue-600 mb-1">
                Aadhar Card
              </label>
              <input
                type="file"
                className="w-full border border-gray-300 rounded-md p-2 text-sm md:text-base"
                onChange={(e) => setAadhar(e.target.files[0])}
              />
              {errors.aadhar && (
                <p className="text-red-600 text-xs mt-1">{errors.aadhar}</p>
              )}
            </div>

            {/* PAN */}
            <div>
              <label className="block text-sm md:text-base font-medium text-blue-600 mb-1">
                PAN Card
              </label>
              <input
                type="file"
                className="w-full border border-gray-300 rounded-md p-2 text-sm md:text-base"
                onChange={(e) => setPan(e.target.files[0])}
              />
              {errors.pan && (
                <p className="text-red-600 text-xs mt-1">{errors.pan}</p>
              )}
            </div>

            {/* Employment ID */}
            <div>
              <label className="block text-sm md:text-base font-medium text-blue-600 mb-1">
                Employment ID Card
              </label>
              <input
                type="file"
                className="w-full border border-gray-300 rounded-md p-2 text-sm md:text-base"
                onChange={(e) => setEmploymentId(e.target.files[0])}
              />
              {errors.employmentId && (
                <p className="text-red-600 text-xs mt-1">
                  {errors.employmentId}
                </p>
              )}
            </div>

            {/* Salary Slips */}
            <div>
              <label className="block text-sm md:text-base font-medium text-blue-600 mb-1">
                Salary Slips (Last 5 Months)
              </label>
              <input
                type="file"
                multiple
                className="w-full border border-gray-300 rounded-md p-2 text-sm md:text-base"
                onChange={(e) => setSalarySlips(e.target.files[0])}
              />
              {errors.salarySlips && (
                <p className="text-red-600 text-xs mt-1">
                  {errors.salarySlips}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
            >
              Submit Documents
            </button><Toaster/>
          </form>
        </div>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full text-center">
            <h3 className="text-lg md:text-xl font-semibold text-blue-600 mb-2">
              Submission Successful
            </h3>
            <p className="text-gray-700 text-sm md:text-base mb-4">
              Thanks for sharing. You’ll receive a call back from our team soon.
            </p>
            <button
              onClick={handlePopupOk}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded-md"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
