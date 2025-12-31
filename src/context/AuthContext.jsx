import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const [fName, setfName] = useState("");
  const [lName, setlName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [productAddFormData, setProductAddFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    thumbnail: "",
  });
  // 🔹 Are we updating a product?
  const [updateProduct, setUpdateProduct] = useState(false);

  // 🔹 WHICH product is being edited (IMPORTANT)
  const [editingProduct, setEditingProduct] = useState(null);



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
        productAddFormData,
        setProductAddFormData,
        updateProduct,
        setUpdateProduct,
        editingProduct,
        setEditingProduct,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
