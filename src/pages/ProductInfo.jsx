import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Loader from "../ui/Loader";
import { FiArrowLeft, FiStar } from "react-icons/fi";

const fetchSingleProduct = async (id) => {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
};

const ProductInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(0);

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchSingleProduct(id),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900 px-6 text-center">
        <p className="text-red-400 text-lg mb-2">Failed to load product</p>
        <p className="text-gray-500 text-sm">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Padding to clear mobile top bar (from Sidebar) */}
      <div className="pt-20 md:pt-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 mb-8 text-gray-400 hover:text-[#4DF2C0] transition-colors text-sm sm:text-base font-medium"
          >
            <FiArrowLeft className="text-xl" />
            Back to products
          </button>

          {/* Main Product Card */}
          <div className="bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* PRODUCT DETAILS - First on mobile */}
              <div className="p-6 sm:p-8 lg:p-10 flex flex-col order-2 lg:order-0">
                {/* Title */}
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 text-gray-100">
                  {product.title}
                </h1>

                {/* Brand & Category */}
                <p className="text-gray-400 text-sm sm:text-base mb-4">
                  <span className="text-gray-200 font-medium">{product.brand || "Unknown Brand"}</span>
                  {" • "}
                  <span className="capitalize">{product.category}</span>
                </p>

                {/* Rating & Stock */}
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="flex items-center gap-1.5 text-yellow-400">
                    <FiStar className="text-lg sm:text-xl" />
                    <span className="font-semibold text-base sm:text-lg">
                      {product.rating}
                    </span>
                    <span className="text-gray-500 text-sm">/ 5</span>
                  </div>

                  <span
                    className={`px-4 py-1.5 rounded-full text-sm font-medium border ${
                      product.stock > 0
                        ? "bg-green-900/50 text-green-400 border-green-800"
                        : "bg-red-900/50 text-red-400 border-red-800"
                    }`}
                  >
                    {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
                  </span>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#4DF2C0]">
                      ${product.price}
                    </span>
                    {product.discountPercentage > 0 && (
                      <span className="text-lg sm:text-xl text-green-400 font-medium">
                        {product.discountPercentage}% OFF
                      </span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className="mb-10 flex-1">
                  <p className="text-gray-300 leading-relaxed text-sm sm:text-base lg:text-lg">
                    {product.description}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="flex-1 px-6 py-4 bg-[#4DF2C0] text-gray-900 font-bold rounded-xl hover:bg-[#3ae0b0] active:scale-95 transition-all duration-200 shadow-lg text-base sm:text-lg">
                    Add to Cart
                  </button>
                  <button className="flex-1 px-6 py-4 border border-gray-600 text-gray-200 font-medium rounded-xl hover:bg-gray-700 active:scale-95 transition-all duration-200 text-base sm:text-lg">
                    Add to Wishlist
                  </button>
                </div>
              </div>

              {/* IMAGE GALLERY - Second on mobile */}
              <div className="relative order-1 lg:order-0">
                {/* Main Image */}
                <div className="aspect-square sm:aspect-auto sm:h-125 lg:h-full overflow-hidden bg-gray-900">
                  <img
                    src={product.images[activeImage]}
                    alt={product.title}
                    className="w-full h-full object-contain sm:object-cover bg-black/50"
                  />
                </div>

                {/* Thumbnail Gallery */}
                {product.images.length > 1 && (
                  <div className="p-4 bg-gray-800 border-t border-gray-700">
                    <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
                      {product.images.map((img, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveImage(index)}
                          className={`shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden border-2 transition-all ${
                            activeImage === index
                              ? "border-[#4DF2C0] ring-2 ring-[#4DF2C0]/30"
                              : "border-gray-600 hover:border-gray-500"
                          }`}
                        >
                          <img
                            src={img}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Extra Product Information */}
          <div className="mt-10 bg-gray-800 border border-gray-700 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-100">Product Details</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-300">
              <div className="space-y-1">
                <p className="text-gray-500 text-sm">Brand</p>
                <p className="font-medium">{product.brand || "N/A"}</p>
              </div>
              <div className="space-y-1">
                <p className="text-gray-500 text-sm">Category</p>
                <p className="font-medium capitalize">{product.category}</p>
              </div>
              <div className="space-y-1">
                <p className="text-gray-500 text-sm">Availability</p>
                <p className="font-medium">
                  {product.stock > 0 ? `${product.stock} units in stock` : "Out of stock"}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-gray-500 text-sm">Customer Rating</p>
                <p className="font-medium">{product.rating} out of 5</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;