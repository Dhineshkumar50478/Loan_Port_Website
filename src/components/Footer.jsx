import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="px-4 py-8 bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        {/* Left Section: Brand and Navigation Links */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          {/* Styled Brand Name */}
          <NavLink to="/home" className="flex items-center hover:opacity-90">
            <div>
              <p className="text-3xl font-bold p-0 m-0 text-yellow-500">
                <span style={{ fontFamily: '"Viner Hand ITC", cursive' }} className="text-yellow-500">L</span>
                <span style={{ fontFamily: "Bell MT, serif" }} className="text-white">oan</span>
                <span style={{ fontFamily: '"Viner Hand ITC", cursive' }} className="text-yellow-500">P</span>
                <span style={{ fontFamily: "Bell MT, serif" }} className="text-white">ort</span>
              </p>
            </div>
          </NavLink>

          {/* Navigation Links */}
          <ul className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-white">
            <li>
              <NavLink to="/home" className="hover:text-yellow-500 font-medium">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about" className="hover:text-yellow-500 font-medium">About Us</NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="hover:text-yellow-500 font-medium">Contact</NavLink>
            </li>
          </ul>
        </div>

        {/* Right Section: Social Media Links */}
        <div className="flex flex-col sm:items-end gap-2">
          <span className="text-yellow-500 font-semibold">Let's Connect With Us</span>
          <ul className="flex flex-col sm:flex-row gap-2 sm:gap-6">
            <li><a href="#" className="hover:text-yellow-500 font-medium">Instagram</a></li>
            <li><a href="#" className="hover:text-yellow-500 font-medium">Facebook</a></li>
            <li><a href="#" className="hover:text-yellow-500 font-medium">Twitter</a></li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm text-yellow-500 mt-6 font-medium">
        © LoanPort. All rights reserved 2025.
      </div>
    </footer>
  );
};

export default Footer;
