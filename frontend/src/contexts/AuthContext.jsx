import { createContext, useState, useMemo } from "react";
import jwtDecode from "jwt-decode";

const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);

  const handleLogin = (userLogin) => {
    const decode = jwtDecode(userLogin.token);
    setUser(decode);
    sessionStorage.setItem("isAuth", "true");
  };

  const handleLogout = () => {
    setUser(null);
    sessionStorage.removeItem("isAuth");
  };

  const value = useMemo(
    () => ({ handleLogin, handleLogout, user }),
    [user, handleLogin, handleLogout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthContextProvider };
