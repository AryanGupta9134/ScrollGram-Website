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

  // ✅ WISHLIST STATE
  const [wishlist, setWishlist] = useState([]);

  // ➕ Add to wishlist
  const addToWishlist = (product) => {
    setWishlist((prev) => {
      const alreadyExists = prev.some((item) => item.id === product.id);
      if (alreadyExists) return prev;
      return [...prev, product];
    });
  };

  // ❌ Remove from wishlist
  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

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
        wishlist,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
