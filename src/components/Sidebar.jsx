import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import Logo from "../ui/Logo";
import { MdLogout } from "react-icons/md";
import { RiShoppingBag2Fill } from "react-icons/ri";
import { FaUser, FaUserEdit, FaHeart, FaShoppingCart } from "react-icons/fa";

const Sidebar = () => {
  const { user, setUser, fName, lName, cart, wishlist, setEditOn } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    if (user) {
      setUser(false);
      navigate("/login");
    }
  };
  const fullName = [fName, lName]
    .map((name) => name?.trim())
    .filter(Boolean)
    .join(" ");
  return (
    <>
      {/* Left Sidebar */}
      <div className="w-2/10 bg-gray-900 border-r border-gray-800 h-full flex flex-col justify-between py-8">
        {/* Logo and Greeting */}
        <div className="flex flex-col items-center gap-4">
          <div className="text-6xl text-[#4DF2C0]">
            <Logo />
          </div>
          <p className="text-sm text-gray-400">Hello, {fName}</p>
        </div>
        {/* Navigation Buttons */}
        <div className="flex flex-col items-center justify-center w-full ">
          {/* Product Button */}
          <button className="p-4 text-lg rounded-lg flex items-center justify-center gap-3 text-white w-full hover:bg-gray-800 hover:text-[#4DF2C0]">
            <RiShoppingBag2Fill /> Products
          </button>
          {/* Cart Button */}
          <button
            onClick={() => navigate("/cart")}
            className="p-4 text-lg rounded-lg flex items-center justify-center gap-3 w-full hover:bg-gray-800 hover:text-[#4DF2C0] transition"
          >
            <FaShoppingCart className="text-xl" />

            <span className="relative flex items-center gap-2">
              Cart
              {/* COUNT BADGE */}
              {cart.length > 0 && (
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#4DF2C0] text-black text-xs font-semibold">
                  {cart.length > 99 ? "99+" : cart.length}
                </span>
              )}
            </span>
          </button>
          {/* Wishlist Button */}
          <button
            onClick={() => navigate("/wishlist")}
            className="p-4 text-lg rounded-lg flex items-center justify-center gap-3 w-full hover:bg-gray-800 hover:text-[#4DF2C0] transition"
          >
            <FaHeart className="text-xl" />

            <span className="relative flex items-center gap-2">
              Wishlist
              {/* COUNT BADGE */}
              {wishlist.length > 0 && (
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-red-500 text-white text-xs font-semibold">
                  {wishlist.length > 99 ? "99+" : wishlist.length}
                </span>
              )}
            </span>
          </button>
        </div>

        {/* Profile Dropdown */}
        <div className="relative group px-4">
          <div className="absolute bottom-full left-4 right-4 mb-3 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl opacity-0 invisible translate-y-4 scale-95 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:scale-100 z-50">
            <button
              onClick={handleLogout}
              className="flex w-full items-center justify-center gap-3 px-4 py-3 text-red-400 rounded-t-xl hover:bg-gray-700 transition-colors"
            >
              <MdLogout className="text-lg" /> Logout
            </button>

            <button
              onClick={() => setEditOn(true)}
              className="flex w-full items-center justify-center gap-3 px-4 py-3 rounded-b-xl hover:bg-gray-700 hover:text-[#4DF2C0] transition-colors"
            >
              <FaUserEdit className="text-lg" /> Edit Profile
            </button>
          </div>

          <div className="w-full p-4 rounded-lg flex items-center justify-center gap-3 cursor-pointer transition-all duration-200 hover:bg-gray-800 hover:text-[#4DF2C0]">
            <FaUser className="text-xl" />
            <span className="text-lg">{fullName}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
