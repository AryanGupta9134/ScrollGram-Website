import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { FaTrash, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const WishList = () => {
  const { wishlist, removeFromWishlist } = useContext(AuthContext);
  const navigate = useNavigate();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-gray-400">
        <FaHeart className="text-6xl mb-4 text-gray-600" />
        <h2 className="text-2xl font-semibold mb-2">Your Wishlist is Empty</h2>
        <p className="text-gray-500">
          Save products you like and find them here ❤️
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* HEADER */}
        <div className="flex items-center gap-3 mb-8">
          <FaHeart className="text-red-500 text-3xl" />
          <h1 className="text-3xl font-bold text-white">My Wishlist</h1>
          <span className="text-gray-400">({wishlist.length})</span>
        </div>

        {/* LIST */}
        <div className="space-y-6">
          {wishlist.map((product) => (
            <div
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
              className="flex flex-col md:flex-row gap-6 bg-gray-800 border border-gray-700 rounded-xl p-6 hover:bg-gray-750 transition cursor-pointer"
            >
              {/* IMAGE */}
              <div className="md:w-72 h-48 shrink-0 rounded-lg overflow-hidden">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* DETAILS */}
              <div className="flex flex-col w-full">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-semibold text-white">
                      {product.title}
                    </h3>
                    <p className="text-gray-400 mt-1">
                      {product.brand || "Unknown Brand"}
                    </p>
                  </div>
                </div>

                <span className="inline-block w-fit mt-3 px-3 py-1 text-xs rounded-full bg-blue-900/40 text-blue-300 border border-blue-800">
                  {product.category}
                </span>

                <p className="text-gray-300 mt-4 leading-relaxed line-clamp-3">
                  {product.description}
                </p>

                <div className="mt-auto flex justify-between items-center pt-6">
                  <span className="text-3xl font-bold text-white">
                    ${product.price}
                  </span>

                  <div className="flex gap-4">
                    <button
                      className="px-6 py-3 bg-blue-500 text-gray-900 rounded-lg hover:bg-[#4DF2C0]"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      Add to Cart
                    </button>

                    <button
                      className="px-6 py-3 border border-gray-600 rounded-lg hover:bg-red-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromWishlist(product.id);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishList;
