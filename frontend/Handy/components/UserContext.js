import { createContext, useState } from "react";
<<<<<<< HEAD
export const UserContext = createContext();
=======

export const UserContext = createContext();

>>>>>>> origin
export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    postcode: "",
<<<<<<< HEAD
    address: "",
=======
>>>>>>> origin
    region: "",
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
<<<<<<< HEAD
};
=======
};
>>>>>>> origin
