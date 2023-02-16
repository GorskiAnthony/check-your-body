import { createContext, useState, useMemo } from "react";
import jwtDecode from "jwt-decode";
import instance from "@services/axios";

const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);

  const handleLogin = (userLogin) => {
    const decode = jwtDecode(userLogin.token);
    setUser(decode);
  };

  const handleLogout = () => {
    instance
      .post("/auth/logout")
      .then((res) => {
        if (res.status === 200) {
          setUser(null);
        } else {
          console.error("An error occurred while logging out");
        }
      })
      .catch((err) => console.error(err));
  };

  const value = useMemo(
    () => ({ handleLogin, handleLogout, user }),
    [user, handleLogin, handleLogout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthContextProvider };
