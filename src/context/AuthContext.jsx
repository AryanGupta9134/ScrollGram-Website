import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    isAuthenticated: false,
    fName: "",
    lName: "",
    email: "",
  });

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

  const [editOn, setEditOn] = useState(false);

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

  // Toggle wishlist item
  const toggleWishlist = (product) => {
  const exists = wishlist.some((item) => item.id === product.id);

  if (exists) {
    // REMOVE
    setWishlist((prev) =>
      prev.filter((item) => item.id !== product.id)
    );
  } else {
    // ADD
    setWishlist((prev) => [...prev, product]);
  }
};

  // ✅ CART STATE
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      // already in cart → increase qty
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      // new item
      return [
        ...prevCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  const increaseQty = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
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
        cart,
        setCart,
        addToCart,
        increaseQty,
        decreaseQty,
        removeFromCart,
        editOn,
        setEditOn,
        toggleWishlist,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
