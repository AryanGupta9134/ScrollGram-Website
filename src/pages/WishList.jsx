import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FaTrash, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const WishList = () => {
  const { wishlist, removeFromWishlist, addToCart } = useContext(AuthContext); // assuming addToCart exists
  const navigate = useNavigate();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-6 text-center pt-20 md:pt-0">
        <FaHeart className="text-8xl mb-6 text-gray-700 opacity-50" />
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-300 mb-3">
          Your Wishlist is Empty
        </h2>
        <p className="text-gray-500 text-base sm:text-lg max-w-md">
          Save products you love and they'll appear here for later ❤️
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-8 px-8 py-3 bg-[#4DF2C0] text-gray-900 font-semibold rounded-xl hover:bg-[#3ae0b0] transition shadow-lg"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Padding to clear mobile top bar */}
      <div className="pt-20 md:pt-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-8">
            <div className="flex items-center gap-3">
              <FaHeart className="text-3xl sm:text-4xl text-red-500" />
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                My Wishlist
              </h1>
            </div>
            <span className="text-lg text-gray-400 self-start sm:self-center">
              ({wishlist.length} {wishlist.length === 1 ? "item" : "items"})
            </span>
          </div>

          {/* Wishlist Items */}
          <div className="space-y-6 lg:space-y-8">
            {wishlist.map((product) => (
              <div
                key={product.id}
                onClick={() => navigate(`/product/${product.id}`)}
                className="bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden shadow-lg 
                           hover:shadow-2xl hover:border-gray-600 transition-all duration-300 
                           cursor-pointer group"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Image */}
                  <div className="md:w-64 lg:w-80 h-56 md:h-auto shrink-0">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Details */}
                  <div className="p-5 sm:p-6 lg:p-8 flex flex-col flex-1">
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 line-clamp-2">
                          {product.title}
                        </h3>
                        <p className="text-gray-400 text-sm sm:text-base">
                          {product.brand || "Unknown Brand"}
                        </p>
                      </div>

                      <span className="shrink-0 px-4 py-1.5 text-xs sm:text-sm font-medium rounded-full bg-blue-900/60 text-blue-300 border border-blue-800">
                        {product.category}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 mt-4 leading-relaxed text-sm sm:text-base line-clamp-3 lg:line-clamp-4">
                      {product.description}
                    </p>

                    {/* Price & Actions */}
                    <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                      <span className="text-3xl sm:text-4xl font-bold text-[#4DF2C0]">
                        ${product.price}
                      </span>

                      <div className="flex flex-col xs:flex-row gap-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart?.(product); // safe call if addToCart exists
                          }}
                          className="px-6 py-3.5 bg-[#4DF2C0] text-gray-900 font-bold rounded-xl 
                                     hover:bg-[#3ae0b0] active:scale-95 transition-all duration-200 
                                     shadow-md text-base"
                        >
                          Add to Cart
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFromWishlist(product.id);
                          }}
                          className="px-6 py-3.5 border border-red-600 text-red-400 font-medium rounded-xl 
                                     hover:bg-red-600/20 active:scale-95 transition-all duration-200 
                                     flex items-center justify-center gap-2 text-base"
                        >
                          <FaTrash className="text-sm" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishList;
