import { useContext, useState } from "react";
import {
  FaSearch,
} from "react-icons/fa";

import { IoMdAdd } from "react-icons/io";
import { AuthContext } from "../context/authContext";
import ProfileEditForm from "../forms/ProfileEditForm";
import ProductsList from "../api/ProductList";
import AddProductForm from "../forms/AddProductForm";
import { useQueryClient } from "@tanstack/react-query";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  const [addProductOn, setAddProductOn] = useState(false);
  const [categoryValue, setCategoryValue] = useState("All");
  const [productSearch, setProductSearch] = useState("");
  const { updateProduct, setUpdateProduct, editOn, setEditOn } = useContext(AuthContext);
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
      <div className="w-8/10 h-screen flex flex-col ">
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
        {updateProduct ? (
          <AddProductForm closeForm={() => setUpdateProduct(false)} />
        ) : null}
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
