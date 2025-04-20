import { useState } from "react";
import dayjs from "dayjs";
import axios from 'axios';

const Profile = () => {
  const [eli_values, setEli_values] = useState({
    Name: "",
    DOB: "",
    Gender: "",
    Maritial_Status: "",
    Dependents: 0,
    Age: 0,
    Education: "",
    Employment_Status: "",
    Total_Income: 0,
    Residential_Status: "",
    Rent_Amount: 0,
    Cibil_Score: 0,
    Email: "",
    Contact_No: "",
    Address: "",
  });

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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile Details:", eli_values);
    axios.post("https://loan-fy-server-git-main-dhineshkumars-projects.vercel.app/profile_completion", { eli_values });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 bg-white">

      {/* Sidebar */}
      <div className="bg-blue-600 text-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">🎯 Profile Completion</h2>
        <ul className="space-y-3 text-sm list-disc list-inside">
          <li>Enter accurate personal details</li>
          <li>Date of Birth auto-calculates age</li>
          <li>Fill all fields to complete your profile</li>
          <li>Details will be used for eligibility</li>
        </ul>
      </div>

      {/* Form Section */}
      <div className="col-span-2 bg-white p-10 rounded-2xl shadow-2xl border border-blue-100">
        <h2 className="text-3xl font-bold text-blue-600 mb-10 text-center">
          📝 Profile Creation
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* LEFT FORM */}
            <div className="space-y-4">
              <FormInput label="Name" name="Name" value={eli_values.Name} onChange={handleChange} />
              <FormInput label="Date of Birth" name="DOB" type="date" value={eli_values.DOB} onChange={handleChange} />
              <FormSelect label="Gender" name="Gender" value={eli_values.Gender} onChange={handleChange} options={["Male", "Female"]} />
              <FormSelect label="Marital Status" name="Maritial_Status" value={eli_values.Maritial_Status} onChange={handleChange} options={["Married", "Not Married"]} />
              <FormInput label="Dependents" name="Dependents" type="number" value={eli_values.Dependents} onChange={handleChange} />
              <FormSelect label="Education" name="Education" value={eli_values.Education} onChange={handleChange} options={["Graduate", "Not Graduate"]} />
            </div>

            {/* RIGHT FORM */}
            <div className="space-y-4">
              <FormSelect label="Employment Status" name="Employment_Status" value={eli_values.Employment_Status} onChange={handleChange} options={["Employed", "Not Employed", "Student"]} />
              <FormInput label="Total Income" name="Total_Income" type="number" value={eli_values.Total_Income} onChange={handleChange} />
              <FormSelect label="Residential Status" name="Residential_Status" value={eli_values.Residential_Status} onChange={handleChange} options={["Rent", "Owned"]} />
              <FormInput label="Rent Amount" name="Rent_Amount" type="number" value={eli_values.Rent_Amount} onChange={handleChange} />
              <FormInput label="CIBIL Score" name="Cibil_Score" type="number" value={eli_values.Cibil_Score} onChange={handleChange} />
              <FormInput label="Email ID" name="Email" type="email" value={eli_values.Email} onChange={handleChange} />
              <FormInput label="Contact No" name="Contact_No" type="number" value={eli_values.Contact_No} onChange={handleChange} />
            </div>
          </div>

          {/* Address */}
          <div className="mt-6">
            <label className="block font-medium text-gray-700 mb-1">Address:</label>
            <textarea
              name="Address"
              value={eli_values.Address}
              onChange={handleChange}
              rows={3}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            ></textarea>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="mt-8 w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 rounded-lg shadow-md transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

// Reusable Input Component
const FormInput = ({ label, name, type = "text", value, onChange }) => (
  <div>
    <label className="block font-medium text-gray-700 mb-1">{label}:</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
    />
  </div>
);

// Reusable Select Component
const FormSelect = ({ label, name, value, onChange, options }) => (
  <div>
    <label className="block font-medium text-gray-700 mb-1">{label}:</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
    >
      <option value="">Select</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

export default Profile;
