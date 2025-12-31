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
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <p className="text-red-400">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 px-6 py-8">
      <div className="max-w-7xl mx-auto">
        {/* 🔙 Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-6 text-gray-400 hover:text-[#4DF2C0]"
        >
          <FiArrowLeft /> Back to products
        </button>

        {/* MAIN SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-gray-800 border border-gray-700 rounded-2xl p-6">
          {/* IMAGE GALLERY */}
          <div>
            <div className="h-105 rounded-xl overflow-hidden border border-gray-700 mb-4">
              <img
                src={product.images[activeImage]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex gap-3 overflow-x-auto">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="preview"
                  onClick={() => setActiveImage(index)}
                  className={`h-20 w-20 object-cover rounded-lg border cursor-pointer ${
                    activeImage === index
                      ? "border-[#4DF2C0]"
                      : "border-gray-600"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* PRODUCT DETAILS */}
          <div className="flex flex-col">
            {/* Title */}
            <h1 className="text-4xl font-bold mb-2">{product.title}</h1>

            {/* Brand & Category */}
            <p className="text-gray-400 mb-4">
              Brand: <span className="text-gray-200">{product.brand}</span> •{" "}
              <span className="capitalize">{product.category}</span>
            </p>

            {/* Rating & Stock */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1 text-yellow-400">
                <FiStar />
                <span>{product.rating}</span>
              </div>

              <span
                className={`text-sm px-3 py-1 rounded-full ${
                  product.stock > 0
                    ? "bg-green-900/40 text-green-400"
                    : "bg-red-900/40 text-red-400"
                }`}
              >
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <p className="text-3xl font-bold">
                ${product.price}
                <span className="text-sm ml-3 text-green-400">
                  {product.discountPercentage}% OFF
                </span>
              </p>
            </div>

            {/* Description */}
            <p className="text-gray-300 leading-relaxed mb-8">
              {product.description}
            </p>

            {/* CTA */}
            <div className="flex gap-4 mt-auto">
              <button className="flex-1 px-6 py-3 bg-[#4DF2C0] text-black font-semibold rounded-lg hover:opacity-90">
                Add to Cart
              </button>

              <button className="flex-1 px-6 py-3 border border-gray-600 rounded-lg hover:bg-gray-700">
                Add to Wishlist
              </button>
            </div>
          </div>
        </div>

        {/* EXTRA DETAILS */}
        <div className="mt-10 bg-gray-800 border border-gray-700 rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-6">Product Information</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-300">
            <div>
              <p className="text-gray-400">Brand</p>
              <p>{product.brand}</p>
            </div>

            <div>
              <p className="text-gray-400">Category</p>
              <p className="capitalize">{product.category}</p>
            </div>

            <div>
              <p className="text-gray-400">Stock Available</p>
              <p>{product.stock} units</p>
            </div>

            <div>
              <p className="text-gray-400">Rating</p>
              <p>{product.rating} / 5</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
