import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children }) => {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const userId = Cookies.get("userId");
    if (userId) {
      setIsAuthenticated(true);
    }
    setCheckingAuth(false); // Finished checking
  }, []);

  if (checkingAuth) return null; // Or show a loader while checking

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
