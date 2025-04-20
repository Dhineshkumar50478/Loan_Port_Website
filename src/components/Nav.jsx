// import React, { useState } from "react";
// import Logo from "../assets/logo.png";
// import { NavLink } from "react-router-dom";
// import { MdMenu, MdClose } from "react-icons/md"; // Combined imports

// const Nav = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   // Toggle mobile menu
//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   return (
//     <nav className="bg-slate-900 p-4 shadow-lg">
//       <div className="container mx-auto flex items-center justify-between">
//         <NavLink to="/home" className="flex items-center hover:animate-pulse">
//           <img src={Logo} alt="Loan Ease Logo" className="h-12 w-auto" />
//         </NavLink>

//         {/* Navigation Links for desktop */}
//         <div className="hidden md:flex space-x-6 text-lg">
//           {[
//             { to: "/home", label: "Home" },
//             { to: "/about", label: "About Us" },
//             { to: "/faqs", label: "FAQs" },
//             { to: "/logout", label: "Logout" },
//           ].map((link, index) => (
//             <NavLink
//               key={index}
//               to={link.to}
//               className={({ isActive }) =>
//                 `no-underline text-cyan-200 hover:text-gray-300 transition-colors duration-200 ${
//                   isActive ? "no-underline text-white font-semibold" : "text-cyan-200"
//                 }`
//               }

//             >
//               {link.label}
//             </NavLink>
//           ))}
//         </div>

//         {/* Mobile Menu Button */}
//         <button
//           className="md:hidden text-black focus:outline-none"
//           onClick={toggleMobileMenu}
//         >
//           <MdMenu className="text-cyan-500 text-2xl" />
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {isMobileMenuOpen && (
//         <div className="md:hidden bg-slate-800 p-4 absolute top-16 left-0 w-full">
//           <button
//             className="absolute top-4 right-4 text-cyan-500"
//             onClick={toggleMobileMenu}
//           >
//             <MdClose className="text-3xl" />
//           </button>
//           <div className="flex flex-col space-y-4 text-lg">
//             {[
//               { to: "/home", label: "Home" },
//               { to: "/about", label: "About Us" },
//               { to: "/faqs", label: "FAQs" },
//               { to: "/logout", label: "Logout" },
//             ].map((link, index) => (
//               <NavLink
//                 key={index}
//                 to={link.to}
//                 className={({ isActive }) =>
//                   `text-cyan-200 hover:text-gray-300 transition-colors duration-200 ${
//                     isActive ? "text-white font-semibold" : "text-cyan-200"
//                   }`
//                 }
//                 onClick={toggleMobileMenu}
//               >
//                 {link.label}
//               </NavLink>
//             ))}
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Nav;

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if the user is logged in when the component mounts
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    console.log(userId);
    
    if (userId) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <>
      <div className="bg-blue-600">
        <div className="flex items-center justify-between p-3">
          <div>
            <p className="text-3xl font-bold p-0 m-0 text-yellow-500">
              <span style={{ fontFamily: '"Viner Hand ITC", cursive' }} className="text-yellow-500">L</span>
              <span style={{ fontFamily: "Bell MT, serif" }} className="text-white">oan</span>
              <span style={{ fontFamily: '"Viner Hand ITC", cursive' }} className="text-yellow-500">P</span>
              <span style={{ fontFamily: "Bell MT, serif" }} className="text-white">ort</span>
            </p>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6 text-lg items-center p-0 m-0">
            <li>
              <Link
                to="/home"
                className="text-white font-medium !no-underline"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/home/about"
                className="text-white font-medium !no-underline"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/home/contact"
                className="text-white font-medium !no-underline"
              >
                Contact
              </Link>
            </li>
            {/* Conditionally show Login/Profile button */}
            {isLoggedIn ? (
              <li>
                <Link
                  to="/view-profile"
                  className="text-white font-medium !no-underline"
                >
                  Profile
                </Link>
              </li>
            ) : (
              <li>
                <Link
                  to="/login"
                  className="text-white font-medium !no-underline"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>

          {/* Hamburger Icon */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <ul className="flex flex-col items-start space-y-4 px-4 pb-4 text-lg md:hidden">
            <li className="cursor-pointer">Home</li>
            <li className="cursor-pointer">About Us</li>
            <li className="cursor-pointer">Contact</li>
            <li className="cursor-pointer">FAQ's</li>
            {/* Conditionally show Login/Profile button */}
            {isLoggedIn ? (
              <li className="cursor-pointer">
                <Link to="/view-profile">Profile</Link>
              </li>
            ) : (
              <li className="cursor-pointer">
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        )}
      </div>
    </>
  );
};

export default Nav;
