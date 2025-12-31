import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { FaTrash, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    cart,
    removeFromCart,
    increaseQty,
    decreaseQty,
  } = useContext(AuthContext);

  const navigate = useNavigate();

  // 🧺 EMPTY CART
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-gray-400">
        <FaShoppingCart className="text-6xl mb-4 text-gray-600" />
        <h2 className="text-2xl font-semibold mb-2">
          Your Cart is Empty
        </h2>
        <p className="text-gray-500 mb-6">
          Add products to cart to see them here
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-[#4DF2C0] text-black rounded-lg font-semibold"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* HEADER */}
        <div className="flex items-center gap-3 mb-8">
          <FaShoppingCart className="text-[#4DF2C0] text-3xl" />
          <h1 className="text-3xl font-bold text-white">
            Shopping Cart
          </h1>
          <span className="text-gray-400">
            ({cart.length})
          </span>
        </div>

        {/* CART CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT: PRODUCTS */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((product) => (
              <div
                key={product.id}
                className="flex flex-col md:flex-row gap-6 bg-gray-800 border border-gray-700 rounded-xl p-6"
              >
                {/* IMAGE */}
                <div className="md:w-56 h-40 shrink-0 rounded-lg overflow-hidden">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* DETAILS */}
                <div className="flex flex-col w-full">
                  {/* TOP */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        {product.title}
                      </h3>
                      <p className="text-gray-400">
                        {product.brand || "Unknown Brand"}
                      </p>
                    </div>

                    <button
                      className="text-gray-400 hover:text-red-500"
                      onClick={() => removeFromCart(product.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>

                  {/* PRICE */}
                  <p className="text-2xl font-bold text-white mt-3">
                    ${product.price}
                  </p>

                  {/* QUANTITY */}
                  <div className="flex items-center gap-4 mt-6">
                    <span className="text-gray-400">
                      Quantity:
                    </span>

                    <div className="flex items-center border border-gray-600 rounded-lg overflow-hidden">
                      <button
                        className="px-4 py-2 hover:bg-gray-700"
                        onClick={() => decreaseQty(product.id)}
                      >
                        −
                      </button>

                      <span className="px-5 py-2 text-white">
                        {product.quantity}
                      </span>

                      <button
                        className="px-4 py-2 hover:bg-gray-700"
                        onClick={() => increaseQty(product.id)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: SUMMARY */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 h-fit sticky top-6">
            <h2 className="text-xl font-semibold text-white mb-6">
              Order Summary
            </h2>

            <div className="flex justify-between text-gray-400 mb-3">
              <span>Items</span>
              <span>{cart.length}</span>
            </div>

            <div className="flex justify-between text-gray-400 mb-3">
              <span>Shipping</span>
              <span>Free</span>
            </div>

            <div className="border-t border-gray-700 my-4" />

            <div className="flex justify-between text-2xl font-bold text-white mb-6">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

            <button className="w-full py-3 bg-[#4DF2C0] text-black rounded-lg font-semibold hover:opacity-90">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
