import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { FaTrash, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, increaseQty, decreaseQty } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // 🧺 EMPTY CART
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-6 text-center pt-20 md:pt-0">
        <FaShoppingCart className="text-8xl mb-6 text-gray-700 opacity-50" />
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-300 mb-3">
          Your Cart is Empty
        </h2>
        <p className="text-gray-500 text-base sm:text-lg max-w-md mb-8">
          Looks like you haven't added anything to your cart yet.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-8 py-4 bg-[#4DF2C0] text-gray-900 font-bold rounded-xl hover:bg-[#3ae0b0] active:scale-95 transition-all duration-200 shadow-lg text-base sm:text-lg"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Top padding to clear mobile top bar */}
      <div className="pt-20 md:pt-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-8">
            <div className="flex items-center gap-3">
              <FaShoppingCart className="text-3xl sm:text-4xl text-[#4DF2C0]" />
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                Shopping Cart
              </h1>
            </div>
            <span className="text-lg text-gray-400 self-start sm:self-center">
              ({cart.length} {cart.length === 1 ? "item" : "items"})
            </span>
          </div>

          {/* Cart Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Left: Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cart.map((product) => (
                <div
                  key={product.id}
                  className="bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden shadow-lg 
                             hover:shadow-2xl hover:border-gray-600 transition-all duration-300 
                             flex flex-col md:flex-row"
                >
                  {/* Image */}
                  <div className="md:w-64 lg:w-72 h-56 md:h-auto shrink-0">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="p-5 sm:p-6 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1 pr-4">
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 line-clamp-2">
                          {product.title}
                        </h3>
                        <p className="text-gray-400 text-sm sm:text-base">
                          {product.brand || "Unknown Brand"}
                        </p>
                      </div>

                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="text-gray-500 hover:text-red-500 transition-colors p-2"
                        aria-label="Remove item"
                      >
                        <FaTrash className="text-lg" />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="mb-6">
                      <span className="text-2xl sm:text-3xl font-bold text-[#4DF2C0]">
                        ${product.price}
                      </span>
                      <span className="text-sm text-gray-500 ml-2">
                        × {product.quantity}
                      </span>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-4 mt-auto">
                      <span className="text-gray-400 font-medium">
                        Quantity:
                      </span>
                      <div className="flex items-center border border-gray-600 rounded-xl overflow-hidden bg-gray-900">
                        <button
                          onClick={() => decreaseQty(product.id)}
                          className="px-4 py-2.5 hover:bg-gray-700 text-xl font-bold text-gray-300 transition"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="px-6 py-2.5 text-white font-semibold min-w-12 text-center">
                          {product.quantity}
                        </span>
                        <button
                          onClick={() => increaseQty(product.id)}
                          className="px-4 py-2.5 hover:bg-gray-700 text-xl font-bold text-gray-300 transition"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Order Summary (Sticky on large screens) */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 sm:p-8 h-fit sticky top-24 lg:top-28 shadow-xl">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 text-gray-300">
                  <div className="flex justify-between">
                    <span>Subtotal ({cart.length} items)</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-400">Free</span>
                  </div>
                  <div className="flex justify-between text-gray-500 text-sm">
                    <span>Tax</span>
                    <span>Included</span>
                  </div>
                </div>

                <div className="border-t border-gray-700 my-6" />

                <div className="flex justify-between items-center mb-8">
                  <span className="text-xl sm:text-2xl font-bold text-white">
                    Total
                  </span>
                  <span className="text-2xl sm:text-3xl font-bold text-[#4DF2C0]">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>

                <button
                  className="w-full py-4 bg-[#4DF2C0] text-gray-900 font-bold rounded-xl 
                                   hover:bg-[#3ae0b0] active:scale-95 transition-all duration-200 
                                   shadow-lg text-base sm:text-lg"
                >
                  Proceed to Checkout
                </button>

                <button
                  onClick={() => navigate("/")}
                  className="w-full mt-4 py-3 text-gray-400 hover:text-[#4DF2C0] font-medium transition"
                >
                  ← Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
