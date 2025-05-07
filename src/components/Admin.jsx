import React, { useState, useEffect } from "react";
import { MdAccountBalance, MdHomeWork } from "react-icons/md";
import { AiOutlineCheckCircle, AiOutlineClockCircle } from "react-icons/ai";
import { FaGraduationCap } from "react-icons/fa6";
import { FaCar, FaUsers } from "react-icons/fa";
import { GiGoldBar } from "react-icons/gi";
import axios from "axios";

const Admin = () => {
  const [view, setView] = useState("pending");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [approvedData, setApprovedData] = useState([]);
  const [pendingData, setPendingData] = useState([]);

  useEffect(() => {
    fetchLoanData("Pending");
    fetchLoanData("Approved");
  }, []);

  const loancardData = [
    {
      icon: MdHomeWork,
      label: "Home Loan",
      approved: 90,
      pending: 56,
    },
    {
      icon: FaGraduationCap,
      label: "Education Loan",
      approved: 80,
      pending: 45,
    },
    {
      icon: FaCar,
      label: "Vehicle Loan",
      approved: 80,
      pending: 45,
    },
    {
      icon: FaUsers,
      label: "Personal Loan",
      approved: 80,
      pending: 45,
    },
    {
      icon: GiGoldBar,
      label: "Gold Loan",
      approved: 80,
      pending: 45,
    },
  ];

  const iconMap = {
    "Home Loan": MdHomeWork,
    "Education Loan": FaGraduationCap,
    "Vehicle Loan": FaCar,
    "Personal Loan": FaUsers,
    "Gold Loan": GiGoldBar,
  };

  const [loanStats, setLoanStats] = useState([]);
  const [totalAccounts, setTotalAccounts] = useState(0);

  useEffect(() => {
    axios.get("https://loan-fy-server-git-main-dhineshkumars-projects.vercel.app/api/loan-stats")
      .then((res) => {
        setTotalAccounts(res.data.totalAccounts);
        setLoanStats(res.data.stats);
      })
      .catch((err) => {
        console.error("Error fetching loan stats:", err);
      });
  }, []);

  const fetchLoanData = async (status) => {
    try {
      const response = await axios.get(`https://loan-fy-server-git-main-dhineshkumars-projects.vercel.app/api/profiles`, {
        params: { status },
      });
      if (status === "Pending") setPendingData(response.data);
      else setApprovedData(response.data);
    } catch (err) {
      console.error(`Error fetching ${status} data:`, err);
    }
  };
  

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`https://loan-fy-server-git-main-dhineshkumars-projects.vercel.app/api/profiles/${id}`, {
        Loan_Status: newStatus,
      });
      // Refresh data
      fetchLoanData("Pending");
      fetchLoanData("Approved");
    } catch (err) {
      console.error("Error updating loan status:", err);
    }
  };

  const currentData = view === "pending" ? pendingData : approvedData;

  const filteredData = currentData.filter((item) => {
    const matchesSearch = item.user_id.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter ? item.Loan_Type === filter : true;
    return matchesSearch && matchesFilter;
  });

  const uniqueLoanTypes = [
    ...new Set([...pendingData, ...approvedData].map((item) => item.Loan_Type)),
  ];

  return (
    <>
      <div className="bg-yellow-500 p-3.5 text-center">
        <p className="text-3xl font-bold p-0 m-0 text-yellow-500">
          <span
            style={{ fontFamily: '"Viner Hand ITC", cursive' }}
            className="text-blue-600"
          >
            A
          </span>
          <span style={{ fontFamily: "Bell MT, serif" }} className="text-white">
            dmin
          </span>
          <span
            style={{ fontFamily: '"Viner Hand ITC", cursive' }}
            className="text-blue-600"
          >
            P
          </span>
          <span style={{ fontFamily: "Bell MT, serif" }} className="text-white">
            ortal
          </span>
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center">
      <div className="inline-flex m-5 rounded-r-xl shadow-xl shadow-gray items-center w-85">
        <div className="p-9 bg-yellow-500 rounded-r-full shadow-xs shadow-yellow-500">
          <MdAccountBalance className="text-4xl text-center" />
        </div>
        <div className="px-6 text-center text-2xl font-bold">
          <p className="text-blue-600 py-2">Total Accounts</p>
          <p>{totalAccounts}</p>
        </div>
      </div>

      {loanStats.map((item, index) => {
        const Icon = iconMap[item.label];
        return (
          <div key={index} className="inline-flex m-5 rounded-r-xl shadow-xl shadow-gray items-center w-85">
            <div className="p-9 bg-yellow-500 rounded-r-full shadow-xs shadow-yellow-500">
              <Icon className="text-4xl text-center" />
            </div>
            <div className="px-6 text-center text-2xl font-bold">
              <p className="text-blue-600 py-2">{item.label}</p>
              <div className="flex justify-around items-center text-lg">
                <div className="flex items-center space-x-2">
                  <AiOutlineCheckCircle className="text-green-600 text-xl" />
                  <span>{item.approved}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <AiOutlineClockCircle className="text-blue-600 text-xl" />
                  <span>{item.pending}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>

      <div>
        <div className="p-6">
          {/* Tabs */}
          <div className="flex space-x-4 mb-4">
            <button
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                view === "pending"
                  ? "bg-yellow-500 text-white shadow-md"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setView("pending")}
            >
              Pending
            </button>
            <button
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                view === "approved"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setView("approved")}
            >
              Approved
            </button>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <input
              type="text"
              placeholder="Search by Loan ID"
              className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="">All Loan Types</option>
              {uniqueLoanTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <div className="rounded-xl overflow-hidden border border-gray-300 shadow-lg">
              <table className="min-w-full text-sm text-left divide-y divide-gray-200">
                <thead
                  className={`${
                    view === "pending" ? "bg-yellow-500" : "bg-blue-600"
                  } text-white`}
                >
                  <tr>
                    <th className="px-4 py-3">User Id</th>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Monthly Income</th>
                    <th className="px-4 py-3">Loan Type</th>
                    <th className="px-4 py-3">Loan Amount</th>
                    <th className="px-4 py-3">Loan Term</th>
                    <th className="px-4 py-3">EMI</th>
                    {view === "pending" && (
                      <th className="px-4 py-3">Action</th>
                    )}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredData.length > 0 ? (
                    filteredData.map((row) => (
                      <tr key={row._id} className="hover:bg-gray-50 transition">
                        <td className="px-4 py-2">{row.user_id}</td>
                        <td className="px-4 py-2">{row.Name}</td>
                        <td className="px-4 py-2">{row.Total_Income}</td>
                        <td className="px-4 py-2">{row.Loan_Type}</td>
                        <td className="px-4 py-2">{row.Loan_Amount}</td>
                        <td className="px-4 py-2">{row.Loan_Term}</td>
                        <td className="px-4 py-2">{row.Loan_Emi}</td>
                        {view === "pending" && (
                          <td className="px-4 py-2 space-x-2">
                            <button
                              onClick={() =>
                                handleStatusChange(row._id, "Approved")
                              }
                              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() =>
                                handleStatusChange(row._id, "Rejected")
                              }
                              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                            >
                              Reject
                            </button>
                          </td>
                        )}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={view === "pending" ? 8 : 7}
                        className="text-center text-gray-500 px-4 py-6"
                      >
                        No records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
