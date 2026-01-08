import React, { useState, useEffect } from "react";
import API from "../services/api";
import { toast } from "sonner";

const AppContext = React.createContext();

export const AppContextProvider = (props) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem("token"),
    user: null,
  });

  useEffect(() => {
    const fetchUser = async () => {
      if (auth.token) {
        try {
          const { data } = await API.get("/auth/me");
          setAuth((prev) => ({ ...prev, user: data.data }));
        } catch (error) {
          console.error("Failed to fetch user", error);
          localStorage.removeItem("token");
          setAuth({ token: null, user: null });
        }
      }
    };
    fetchUser();
  }, [auth.token]);

  const logout = () => {
    localStorage.removeItem("token");
    setAuth({ token: null, user: null });
    toast.success("Logged out");
  };

  const value = {
    auth,
    setAuth,
    logout,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
export default AppContext;