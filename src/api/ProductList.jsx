import { useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "../ui/Loader";
import { FiEdit3 } from "react-icons/fi";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

const fetchProducts = async () => {
  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();
  return data.products;
};

const ProductsList = ({ productSearch, categoryValue }) => {
  const {
    setUpdateProduct,
    setEditingProduct,
    addToWishlist,
    wishlist,
    addToCart,
  } = useContext(AuthContext);

  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const removeProduct = (productId) => {
    queryClient.setQueryData(["products"], (oldProducts = []) =>
      oldProducts.filter((product) => product.id !== productId)
    );
  };

  const filteredProducts = (products || []).filter((product) => {
    if (!product) return false; // skip null/undefined
    const categoryMatch =
      categoryValue === "All" || product.category === categoryValue;

    const searchMatch =
      productSearch.trim() === "" ||
      (product.title &&
        product.title.toLowerCase().includes(productSearch.toLowerCase()));

    return categoryMatch && searchMatch;
  });

  if (isLoading) {
    return (
      <div className="flex justify-center min-h-screen w-full">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center min-h-screen w-full items-center">
        <p className="text-red-400 text-lg">{error.message}</p>
      </div>
    );
  }

  const handleEditProduct = (product) => {
    setUpdateProduct(true);
    setEditingProduct(product);
  };

  const isInWishlist = (id) => wishlist.some((item) => item.id === id);

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto">
      <div className="space-y-6 sm:space-y-8">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-gray-800 rounded-xl shadow-lg overflow-hidden 
                       hover:shadow-2xl transition-shadow duration-300 
                       border border-gray-700 cursor-pointer"
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <div className="flex flex-col md:flex-row">
              {/* Product Image */}
              <div
                className="w-full md:w-80 lg:w-96 
                              h-56 sm:h-64 md:h-auto shrink-0"
              >
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Details */}
              <div className="flex flex-col p-4 sm:p-6 md:p-8 w-full">
                {/* TOP ROW */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-100">
                      {product.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400 mt-1">
                      by {product.brand || "Unknown Brand"}
                    </p>
                  </div>

                  <span
                    className="self-start px-3 py-1 bg-blue-900/50 
                                   text-blue-300 text-xs font-semibold 
                                   rounded-full border border-blue-800"
                  >
                    {product.category}
                  </span>
                </div>

                {/* Price */}
                <div className="mb-4 sm:mb-6">
                  <span className="text-2xl sm:text-3xl font-bold text-gray-100">
                    ${product.price}
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-300 mb-6 leading-relaxed text-sm sm:text-base line-clamp-3 sm:line-clamp-none">
                  {product.description}
                </p>

                {/* BOTTOM ROW */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mt-auto">
                  {/* LEFT ACTIONS */}
                  <div className="flex flex-wrap gap-3">
                    <button
                      className="px-4 sm:px-6 py-2.5 sm:py-3 
                                 bg-blue-500 text-gray-900 
                                 rounded-lg hover:bg-[#4DF2C0] 
                                 transition font-medium text-sm sm:text-base"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                    >
                      Add to Cart
                    </button>

                    <button
                      className="px-4 sm:px-6 py-2.5 sm:py-3 
                                 border border-gray-600 
                                 rounded-lg hover:bg-red-600 
                                 transition text-sm sm:text-base"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeProduct(product.id);
                      }}
                    >
                      Remove
                    </button>
                  </div>

                  {/* RIGHT ACTIONS */}
                  <div className="flex gap-4 justify-end">
                    <button
                      className={`transition ${
                        isInWishlist(product.id) ? "text-red-500" : "text-white"
                      } hover:text-red-500`}
                      onClick={(e) => {
                        e.stopPropagation();
                        addToWishlist(product);
                      }}
                    >
                      <FaHeart className="text-xl" />
                    </button>

                    <button
                      className="border border-blue-500 p-2 rounded-full 
                                 hover:border-[#4DF2C0] transition 
                                 text-blue-500 hover:text-[#4DF2C0]"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditProduct(product);
                      }}
                    >
                      <FiEdit3 className="text-xl" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <p className="text-center text-gray-500 py-12">No products found.</p>
      )}
    </div>
  );
};

export default ProductsList;
