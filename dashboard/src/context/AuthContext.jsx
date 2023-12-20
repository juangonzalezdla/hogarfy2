import { createContext, useContext, useState, useEffect } from "react";
import { loginRequest, verifyTokenRequest } from "../api/requests.js";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [errorsMessage, setErrorsMessage] = useState([]);
  const [successMessage, setSuccessMessage] = useState([]);
  const [loading, setLoading] = useState(true);

  // Clear errors after 5 seconds
  useEffect(() => {
    if (errorsMessage.length > 0 || successMessage.length > 0) {
      const timer = setTimeout(() => {
        setErrorsMessage([]);
        setSuccessMessage([]);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [errorsMessage, successMessage]);

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      console.log(res.data.message);
      setUser(res.data);
      setIsAuthenticated(true);
      setSuccessMessage(res.data.message);
    } catch (error) {
      console.log(error.response.data);
      setErrorsMessage(error.response.data.message);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const res = await verifyTokenRequest(cookies.token);
        console.log(res);
        if (!res.data) return setIsAuthenticated(false);
        setIsAuthenticated(true);
        if (res.data.roles.admin === true) {
          setIsAuthorized(true);
        }
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signin,
        logout,
        isAuthenticated,
        isAuthorized,
        successMessage,
        errorsMessage,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};