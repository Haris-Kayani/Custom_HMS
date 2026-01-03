import React from "react";
import { doctors } from "../assets/assets";

const AppContext = React.createContext();

export const AppContextProvider = (props) => {
  const value = {
    doctors
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
export default AppContext;