import { createContext } from "react";

const AuthContext = createContext({
  isAuthenticated: false,
  token: null,
  user: null,
});

export default AuthContext;

