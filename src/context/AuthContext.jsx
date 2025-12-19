import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const [fName, setfName] = useState("");
  const [lName, setlName] = useState("");

  const [userEmail, setUserEmail] = useState("");

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        fName,
        setfName,
        userEmail,
        setUserEmail,
        lName,
        setlName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
