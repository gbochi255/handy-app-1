import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    user_id: 0,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    postcode: "",
<<<<<<< HEAD
    address: "",
    region: "",
=======
    county: "",
    city: "",
>>>>>>> 1e2280fabdd0dbbe8f6026d253fec851e0ba7405
    long: "",
    lat: "",
    bio: "",
    photoUrl: "",
    isProvider: false,
    token: false,
  });

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
