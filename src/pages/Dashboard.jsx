import { useContext, useState } from "react";
import {
  FaUser,
  FaUserEdit,
  FaHeart,
  FaShoppingCart,
  FaSearch,
} from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { RiShoppingBag2Fill } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import { AuthContext } from "../context/authContext";
import Logo from "../ui/Logo";
import { useNavigate } from "react-router-dom";
import ProfileEditForm from "../forms/ProfileEditForm";
import ProductsList from "../api/ProductList";
import AddProductForm from "../forms/AddProductForm";
import { useQueryClient } from "@tanstack/react-query";

const Dashboard = () => {
  const [editOn, setEditOn] = useState(false);
  const [addProductOn, setAddProductOn] = useState(false);
  const [categoryValue, setCategoryValue] = useState("All");
  const [productSearch, setProductSearch] = useState("");
  const { fName, lName, user, setUser, updateProduct, setUpdateProduct } =
    useContext(AuthContext);

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const handleLogout = () => {
    if (user) {
      setUser(false);
      navigate("/login");
    }
  };

  const addProduct = (newProduct) => {
    queryClient.setQueryData(["products"], (oldProducts = []) => [
      newProduct,
      ...oldProducts,
    ]);
  };

  return (
    <div className="h-screen flex bg-gray-900 text-gray-100">
      {/* Left Sidebar */}
      <div className="w-2/10 bg-gray-900 border-r border-gray-800 h-full flex flex-col justify-between py-8">
        <div className="flex flex-col items-center gap-4">
          <div className="text-6xl text-[#4DF2C0]">
            <Logo />
          </div>
          <p className="text-sm text-gray-400">Hello, {fName}</p>
        </div>

        <div className="flex flex-col items-center justify-center w-full ">
          <button className="p-4 text-lg rounded-lg flex items-center justify-center gap-3 w-full hover:bg-gray-800 hover:text-[#4DF2C0]">
            <FaShoppingCart /> Cart
          </button>
          <button className="p-4 text-lg rounded-lg flex items-center justify-center gap-3 text-white w-full hover:bg-gray-800 hover:text-[#4DF2C0]">
            <RiShoppingBag2Fill /> Products
          </button>
          <button className="p-4 text-lg rounded-lg flex items-center justify-center gap-3 w-full hover:bg-gray-800 hover:text-[#4DF2C0]">
            <FaHeart /> Wishlist
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
            <span className="text-lg">
              {fName} {lName}
            </span>
          </div>
        </div>
      </div>

      {/* Right Content */}
      <div className="w-8/10 h-screen flex flex-col">
        {editOn && (
          <div className="absolute inset-0 z-50 bg-gray-900/95 backdrop-blur-sm flex items-center justify-center">
            <ProfileEditForm closeForm={() => setEditOn(false)} />
          </div>
        )}

        {addProductOn && (
          <AddProductForm
            closeForm={() => setAddProductOn(false)}
            addProduct={addProduct} // directly pass it
          />
        )}
        {updateProduct ? <AddProductForm closeForm={() => setUpdateProduct(false)} /> : null}
        <div className="p-5 border-b border-gray-800 flex justify-between">
          <div className="flex items-center gap-4 flex-wrap">
            <select
              value={categoryValue}
              onChange={(e) => setCategoryValue(e.target.value)}
              className="px-6 py-3 bg-gray-800 border border-gray-700 rounded-full text-gray-100 outline-none hover:bg-gray-700 hover:border-gray-600"
            >
              <option value="All">-- Category --</option>
              <option value="beauty">Beauty</option>
              <option value="fragrances">Fragrances</option>
              <option value="furniture">Furniture</option>
              <option value="groceries">Groceries</option>
            </select>

            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                placeholder="Search products..."
                className="pl-12 pr-4 py-2.5 bg-gray-800 border border-gray-700 rounded-full outline-none"
              />
            </div>
          </div>
          <div>
            <button
              className="flex items-center gap-2 px-5 py-2.5 bg-gray-800 border border-gray-700 rounded-full hover:bg-gray-700 hover:border-gray-600 transition"
              onClick={() => setAddProductOn(true)}
            >
              <IoMdAdd />
              <span>Add Item</span>
            </button>
          </div>
        </div>

        <div className="flex overflow-y-auto snap-y snap-mandatory scrollbar-none">
          <ProductsList
            categoryValue={categoryValue}
            productSearch={productSearch}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
