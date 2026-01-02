import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import Logo from "../ui/Logo";
import { MdLogout, MdMenu } from "react-icons/md";
import { RiShoppingBag2Fill } from "react-icons/ri";
import { FaUser, FaUserEdit, FaHeart, FaShoppingCart } from "react-icons/fa";

const Sidebar = () => {
  const { user, setUser, fName, lName, cart, wishlist, setEditOn } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      {/* Mobile Top Bar with Dropdown Menu */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-gray-900 border-b border-gray-800">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo + Greeting */}
          <div className="flex items-center gap-3">
            <div className="text-4xl text-[#4DF2C0]">
              <Logo />
            </div>
            <p className="text-sm text-gray-400 truncate max-w-35">
              Hello, {fName}
            </p>
          </div>

          {/* Dropdown Trigger */}
          <div className="relative">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-800 transition"
            >
              <MdMenu className="text-3xl text-gray-300" />
            </button>

            {/* Mobile Dropdown Menu */}
            {mobileMenuOpen && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 bg-black/50 z-40"
                  onClick={() => setMobileMenuOpen(false)}
                />
                {/* Menu Panel */}
                <div className="absolute right-0 top-12 w-64 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl overflow-hidden z-50">
                  <div className="flex flex-col">
                    {/* Products */}
                    <button
                      onClick={() => {
                        navigate("/");
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-4 px-5 py-4 hover:bg-gray-700 transition text-left"
                    >
                      <RiShoppingBag2Fill className="text-xl text-gray-300" />
                      <span>Products</span>
                    </button>

                    {/* Cart */}
                    <button
                      onClick={() => {
                        navigate("/cart");
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center justify-between px-5 py-4 hover:bg-gray-700 transition"
                    >
                      <div className="flex items-center gap-4">
                        <FaShoppingCart className="text-xl text-gray-300" />
                        <span>Cart</span>
                      </div>
                      {cart.length > 0 && (
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#4DF2C0] text-black text-xs font-bold">
                          {cart.length > 99 ? "99+" : cart.length}
                        </span>
                      )}
                    </button>

                    {/* Wishlist */}
                    <button
                      onClick={() => {
                        navigate("/wishlist");
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center justify-between px-5 py-4 hover:bg-gray-700 transition"
                    >
                      <div className="flex items-center gap-4">
                        <FaHeart className="text-xl text-gray-300" />
                        <span>Wishlist</span>
                      </div>
                      {wishlist.length > 0 && (
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-500 text-white text-xs font-bold">
                          {wishlist.length > 99 ? "99+" : wishlist.length}
                        </span>
                      )}
                    </button>

                    <div className="border-t border-gray-700 my-2" />

                    {/* Profile Section */}
                    <div className="px-5 py-3 text-sm text-gray-400">
                      <div className="flex items-center gap-3 mb-3">
                        <FaUser className="text-lg" />
                        <span className="truncate">{fullName}</span>
                      </div>
                    </div>

                    {/* Edit Profile */}
                    <button
                      onClick={() => {
                        setEditOn(true);
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-4 px-5 py-3 hover:bg-gray-700 hover:text-[#4DF2C0] transition text-left text-sm"
                    >
                      <FaUserEdit className="text-lg" />
                      Edit Profile
                    </button>

                    {/* Logout */}
                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-4 px-5 py-3 text-red-400 hover:bg-gray-700 transition text-left text-sm"
                    >
                      <MdLogout className="text-lg" />
                      Logout
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Desktop Sidebar (unchanged) */}
      <div className="hidden md:flex w-64 lg:w-72 bg-gray-900 border-r border-gray-800 h-screen flex-col justify-between py-8 px-4 overflow-y-auto">
        {/* Logo and Greeting */}
        <div className="flex flex-col items-center gap-4">
          <div className="text-6xl text-[#4DF2C0]">
            <Logo />
          </div>
          <p className="text-sm text-gray-400">Hello, {fName}</p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col w-full space-y-2">
          <button className="p-4 text-lg rounded-lg flex items-center justify-center gap-3 text-white w-full hover:bg-gray-800 hover:text-[#4DF2C0] transition">
            <RiShoppingBag2Fill className="text-2xl" />
            Products
          </button>

          <button
            onClick={() => navigate("/cart")}
            className="p-4 text-lg rounded-lg flex items-center justify-center gap-3 w-full hover:bg-gray-800 hover:text-[#4DF2C0] transition"
          >
            <FaShoppingCart className="text-2xl" />
            <span className="relative flex items-center gap-2">
              Cart
              {cart.length > 0 && (
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#4DF2C0] text-black text-xs font-bold">
                  {cart.length > 99 ? "99+" : cart.length}
                </span>
              )}
            </span>
          </button>

          <button
            onClick={() => navigate("/wishlist")}
            className="p-4 text-lg rounded-lg flex items-center justify-center gap-3 w-full hover:bg-gray-800 hover:text-[#4DF2C0] transition"
          >
            <FaHeart className="text-2xl" />
            <span className="relative flex items-center gap-2">
              Wishlist
              {wishlist.length > 0 && (
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-500 text-white text-xs font-bold">
                  {wishlist.length > 99 ? "99+" : wishlist.length}
                </span>
              )}
            </span>
          </button>
        </div>

        {/* Profile Dropdown */}
        <div className="relative group px-4 mt-auto">
          <div className="absolute bottom-full left-4 right-4 mb-3 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl opacity-0 invisible translate-y-4 scale-95 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:scale-100 z-50">
            <button
              onClick={handleLogout}
              className="flex w-full items-center justify-center gap-3 px-4 py-3 text-red-400 hover:bg-gray-700 transition-colors"
            >
              <MdLogout className="text-lg" />
              Logout
            </button>
            <button
              onClick={() => setEditOn(true)}
              className="flex w-full items-center justify-center gap-3 px-4 py-3 rounded-b-xl hover:bg-gray-700 hover:text-[#4DF2C0] transition-colors"
            >
              <FaUserEdit className="text-lg" />
              Edit Profile
            </button>
          </div>

          <div className="w-full p-4 rounded-lg flex items-center justify-center gap-3 cursor-pointer transition-all duration-200 hover:bg-gray-800 hover:text-[#4DF2C0]">
            <FaUser className="text-2xl" />
            <span className="text-lg truncate max-w-45">{fullName}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;