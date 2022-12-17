import React, { createContext, useState } from "react";

export const AppContext = createContext({
    userInfo: {},
    setUserInfo: () => {},
});

export default function MyContext({ children }) {
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
  });
  return (
    <>
      <AppContext.Provider
        value={{
          setUserInfo,
          userInfo,
        }}
      >
        {children}
      </AppContext.Provider>
    </>
  );
}
