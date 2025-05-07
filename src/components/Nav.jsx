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
                to="about"
                className="text-white font-medium !no-underline"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="contact"
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
            <li className="cursor-pointer">
            <Link to="/home">Home</Link>
            </li>
            <li className="cursor-pointer">
            <Link to="about">About Us</Link>
            </li>
            <li className="cursor-pointer">
            <Link to="contact">Contact</Link>
            </li>
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
