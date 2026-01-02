import { useContext, useState } from "react";
import { FaSearch } from "react-icons/fa";

import { IoMdAdd } from "react-icons/io";
import { AuthContext } from "../context/AuthContext";
import ProfileEditForm from "../forms/ProfileEditForm";
import ProductsList from "../api/ProductList";
import AddProductForm from "../forms/AddProductForm";
import { useQueryClient } from "@tanstack/react-query";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  const [addProductOn, setAddProductOn] = useState(false);
  const [categoryValue, setCategoryValue] = useState("All");
  const [productSearch, setProductSearch] = useState("");
  const { updateProduct, setUpdateProduct, editOn, setEditOn } =
    useContext(AuthContext);
  const queryClient = useQueryClient();

  const addProduct = (newProduct) => {
    queryClient.setQueryData(["products"], (oldProducts = []) => [
      newProduct,
      ...oldProducts,
    ]);
  };

  return (
    <div className="h-screen flex bg-gray-900 text-gray-100">
      {/* Left Sidebar */}
      <Sidebar />
      {/* Right Content */}
      <div className="flex-1 flex flex-col bg-gray-900 text-gray-100">
        {/* Modals / Forms Overlays */}
        {editOn && (
          <div className="fixed inset-0 z-50 bg-gray-900/95 backdrop-blur-sm flex items-center justify-center p-4">
            <ProfileEditForm closeForm={() => setEditOn(false)} />
          </div>
        )}

        {addProductOn && (
          <div className="fixed inset-0 z-50 bg-gray-900/95 backdrop-blur-sm flex items-center justify-center p-4">
            <AddProductForm
              closeForm={() => setAddProductOn(false)}
              addProduct={addProduct}
            />
          </div>
        )}

        {updateProduct && (
          <div className="fixed inset-0 z-50 bg-gray-900/95 backdrop-blur-sm flex items-center justify-center p-4">
            <AddProductForm closeForm={() => setUpdateProduct(false)} />
          </div>
        )}

        {/* Header Controls Bar */}
        {/* Header Controls Bar - Mobile-First & Fully Responsive */}
        <div className="p-4 sm:p-5 border-b border-gray-800 bg-gray-900/80 backdrop-blur sticky top-16 md:top-0 z-30">
          <div className="max-w-7xl mx-auto">
            {/* Wrapper with flex column on small, row on larger */}
            <div className="flex flex-col gap-4">
              {/* Top Row: Category + Search (stacks vertically on very small screens) */}
              <div className="flex flex-col xs:flex-row gap-3">
                {/* Category Select - Full width on tiny screens */}
                <select
                  value={categoryValue}
                  onChange={(e) => setCategoryValue(e.target.value)}
                  className="
            w-full xs:w-auto
            min-w-40
            px-5 py-3
            bg-gray-800 border border-gray-700
            rounded-full text-gray-100 text-sm
            outline-none focus:border-[#4DF2C0] transition
            hover:bg-gray-700 hover:border-gray-600
          "
                >
                  <option value="All">-- Category --</option>
                  <option value="beauty">Beauty</option>
                  <option value="fragrances">Fragrances</option>
                  <option value="furniture">Furniture</option>
                  <option value="groceries">Groceries</option>
                </select>

                {/* Search Input - Expands to fill available space */}
                <div className="relative flex-1 min-w-0">
                  <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none" />
                  <input
                    type="text"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder="Search products..."
                    className="
              w-full
              pl-12 pr-5 py-3
              bg-gray-800 border border-gray-700
              rounded-full outline-none text-sm
              focus:border-[#4DF2C0] transition
              placeholder-gray-500
            "
                  />
                </div>
              </div>

              {/* Bottom Row: Add Item Button - Centered on mobile */}
              <div className="flex justify-center sm:justify-end">
                <button
                  onClick={() => setAddProductOn(true)}
                  className="
            flex items-center justify-center gap-2
            w-full xs:w-auto
            max-w-sm sm:max-w-none
            px-8 py-3.5
            bg-[#4DF2C0] text-gray-900 font-semibold text-base
            rounded-full
            hover:bg-[#3ae0b0] 
            transition-all duration-200 shadow-lg
          "
                >
                  <IoMdAdd className="text-xl" />
                  <span>Add Item</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Products List Area */}
        <div className="flex-1 overflow-y-auto scrollbar-none">
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
