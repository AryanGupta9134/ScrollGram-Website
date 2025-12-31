import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./auth/ProtectedRoute";
import LogIn from "./forms/LogIn";
import ProductInfo from "./pages/ProductInfo";
import WishList from "./pages/WishList";
import Cart from "./pages/Cart";

const App = () => {
  return (
    <div className="bg-black text-white">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LogIn />} />
        <Route path="/product/:id" element={<ProductInfo />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
};

export default App;
