import { useState } from "react";
import open_account from "../assets/open_account.png";
import { Link } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import toast, {Toaster} from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

function Register() {
  const [eli_values, setEli_values] = useState({
    Name: "",
    DOB: "",
    Gender: "",
    Maritial_Status: "",
    Dependents: "",
    Age: "",
    Education: "",
    Employment_Status: "",
    Total_Income: "",
    Residential_Status: "",
    Rent_Amount: "",
    Cibil_Score: "",
    Email: "",
    Password: "",
    Contact_No: "",
    Address: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (name === "DOB") {
      const birthDate = dayjs(value);
      const today = dayjs();
      const age = today.diff(birthDate, "year");

      setEli_values((prev) => ({
        ...prev,
        DOB: value,
        Age: age,
      }));
    } else {
      setEli_values((prev) => ({
        ...prev,
        [name]: type === "number" ? (value === "" ? "" : Number(value)) : value,
      }));
    }

    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error when typing
  };

  const validateForm = () => {
    const newErrors = {};
    Object.entries(eli_values).forEach(([key, value]) => {
      if (value === "" || value === null) {
        newErrors[key] = `${key.replace(/_/g, " ")} is required`;
      }
    });
  
    // Password validation
    if (eli_values.Password && eli_values.Password.length < 8) {
      newErrors.Password = "Password must be at least 8 characters";
    }
  
    return newErrors;
  };
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  
    const toastId = toast.loading("Submitting profile...", {
      style: { background: "#facc15", color: "black" }, // yellow-500
    });
  
    try {
      await axios.post("https://loan-fy-server-git-main-dhineshkumars-projects.vercel.app/profile_completion", { eli_values });
  
      toast.dismiss(toastId);
      toast.success("Profile registered successfully!", {
        style: { background: "#4ade80", color: "black" }, // green-400
      });
  
      // Navigate to Sign In page after short delay
      setTimeout(() => {
        navigate("/login");
      }, 1500); // delay to let user see toast
    } catch (err) {
      toast.dismiss(toastId);
      console.error("Error posting profile:", err);
      toast.error("Something went wrong. Try again later.", {
        style: { background: "#f87171", color: "black" }, // red-400
      });
    }
  };

  return (
    <div className="w-full flex flex-col md:flex-row bg-blue-500 min-h-screen p-4 md:p-6">
      {/* Left */}
      <div className="w-full md:w-1/4 bg-blue-600 p-6 rounded-lg flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold text-white mb-6 text-center py-4">
          Register Your Account
        </h2>
        <img src={open_account} className="w-3/4 md:w-full mx-auto" />
        <p className="text-center text-lg font-semibold mt-6 text-yellow-400">
          Already a user?{" "}
          <Link to="/login" className="text-white underline">
            Sign In
          </Link>
        </p>
      </div>

      {/* Right */}
      <div className="w-full md:w-3/4 bg-white p-6 md:p-10 rounded-2xl shadow-2xl border border-blue-100 mt-6 md:mt-0">
        <h2 className="text-3xl font-bold text-yellow-500 mb-10 text-center">
        Build Your Profile
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* LEFT */}
            <div className="space-y-4">
              <FormInput label="Name" name="Name" placeholder="Enter your full name" value={eli_values.Name} onChange={handleChange} error={errors.Name} />
              <FormInput label="Date of Birth" name="DOB" type="date" value={eli_values.DOB} onChange={handleChange} error={errors.DOB} />
              <FormSelect label="Gender" name="Gender" value={eli_values.Gender} onChange={handleChange} options={["Male", "Female"]} error={errors.Gender} />
              <FormSelect label="Marital Status" name="Maritial_Status" value={eli_values.Maritial_Status} onChange={handleChange} options={["Married", "Not Married"]} error={errors.Maritial_Status} />
              <FormInput label="Dependents" name="Dependents" type="number" placeholder="e.g. 2" value={eli_values.Dependents} onChange={handleChange} error={errors.Dependents} />
              <FormSelect label="Education" name="Education" value={eli_values.Education} onChange={handleChange} options={["Graduate", "Not Graduate"]} error={errors.Education} />
              <FormInput label="Password" name="Password" type="password" placeholder="Create a strong password" value={eli_values.Password} onChange={handleChange} error={errors.Password} />
            </div>

            {/* RIGHT */}
            <div className="space-y-4">
              <FormSelect label="Employment Status" name="Employment_Status" value={eli_values.Employment_Status} onChange={handleChange} options={["Employed", "Not Employed", "Student"]} error={errors.Employment_Status} />
              <FormInput label="Monthly Income" name="Total_Income" type="number" placeholder="Enter total monthly income" value={eli_values.Total_Income} onChange={handleChange} error={errors.Total_Income} />
              <FormSelect label="Residential Status" name="Residential_Status" value={eli_values.Residential_Status} onChange={handleChange} options={["Rent", "Owned"]} error={errors.Residential_Status} />
              <FormInput label="Rent Amount Per Month" name="Rent_Amount" type="number" placeholder="Enter rent if applicable else put 0" value={eli_values.Rent_Amount} onChange={handleChange} error={errors.Rent_Amount} />
              <FormInput label="CIBIL Score" name="Cibil_Score" type="number" placeholder="Score out of 900" value={eli_values.Cibil_Score} onChange={handleChange} error={errors.Cibil_Score} />
              <FormInput label="Email ID" name="Email" type="email" placeholder="you@example.com" value={eli_values.Email} onChange={handleChange} error={errors.Email} />
              <FormInput label="Contact No" name="Contact_No" type="number" placeholder="Enter mobile number" value={eli_values.Contact_No} onChange={handleChange} error={errors.Contact_No} />
            </div>
          </div>

          {/* Address */}
          <div className="mt-6">
            <label className="block font-medium text-gray-700 mb-1">Address:</label>
            <textarea
              name="Address"
              placeholder="Enter your full address"
              value={eli_values.Address}
              onChange={handleChange}
              rows={3}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            />
            {errors.Address && <p className="text-red-500 text-sm mt-1">{errors.Address}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="mt-8 w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 rounded-lg shadow-md transition duration-300"
          >
            Submit
          </button><Toaster/>
        </form>
      </div>
    </div>
  );
}

// Reusable Input Component
const FormInput = ({ label, name, type = "text", placeholder = "", value, onChange, error }) => {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="relative">
      <label className="block font-medium text-gray-700 mb-1">{label}:</label>
      <input
        type={isPassword && show ? "text" : type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full border rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 transition ${
          error ? "border-red-500 ring-red-300" : "focus:ring-blue-600"
        }`}
      />
      {isPassword && (
        <span
          onClick={() => setShow((prev) => !prev)}
          className="absolute top-9 right-3 text-gray-500 cursor-pointer"
        >
          {show ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
        </span>
      )}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};


// Reusable Select Component
const FormSelect = ({ label, name, value, onChange, options, error }) => (
  <div>
    <label className="block font-medium text-gray-700 mb-1">{label}:</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 transition ${error ? "border-red-500 ring-red-300" : "focus:ring-blue-600"}`}
    >
      <option value="">Select</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default Register;
