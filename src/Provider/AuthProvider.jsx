import { useState } from "react";
import AuthContext from "../context/AuthContext";
import { useCookies } from "react-cookie";
import { apiInstance } from "../api/apiInstance";

const AuthProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [token, setToken] = useState(cookies.token || null);
  console.log(cookies.user);
  const [user, setUser] = useState(cookies.user ? cookies.user : null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const res = await apiInstance.get("/user/auth");

      if (res.status !== 200) {
        throw new Error("Not authenticated");
      }

      const data = await res.data;
      setUser(data.user); // { id, email, username }
      setCookie("user", JSON.stringify(data.user), { path: "/" });
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = (token, user) => {
    setToken(token);
    setCookie("token", token, { path: "/" });
    setCookie("user", JSON.stringify(user), { path: "/" });
  };
  const logout = () => {
    setToken(null);
    removeCookie("token", { path: "/" });
    removeCookie("user", { path: "/" });
  };
  // if token is not provided or undefined or null or empty string
  const isAuthenticated = !!token;

  // Check authentication status on mount
  useState(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        isAuthenticated,
        token,
        user: user,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
