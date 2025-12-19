import { useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "../ui/Loader";

const fetchProducts = async () => {
  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();
  return data.products;
};


const ProductsList = ({productSearch, categoryValue}) => {
  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const queryClient = useQueryClient();
  const removeProduct = (productId) => {
    queryClient.setQueryData(["products"], (oldProducts = []) =>
      oldProducts.filter((product) => product.id !== productId)
    );
  };

  const filteredProducts = products.filter((product) => {
  const categoryMatch =
    categoryValue === "All" || product.category === categoryValue;

  const searchMatch =
    productSearch.trim() === "" ||
    product.title.toLowerCase().includes(productSearch.toLowerCase());

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



  return (
    <div className="p-6 max-w-6xl mx-auto ">
      <div className="space-y-8 pb-12">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 border border-gray-700"
          >
            <div className="flex flex-col h-full md:flex-row">
              {/* Product Image */}
              <div className="md:w-96 h-80 md:h-auto">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Details */}
              <div className="flex-1 p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-100">
                      {product.title}
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">
                      by {product.brand || "Unknown Brand"}
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-blue-900/50 text-blue-300 text-xs font-semibold rounded-full border border-blue-800">
                    {product.category}
                  </span>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-3xl font-bold text-gray-100">
                    ${product.price}
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {product.description}
                </p>

                {/* Actions */}
                <div className="flex gap-3">
                  <button className="px-6 py-3 bg-blue-500 text-gray-900 rounded-lg hover:bg-[#4DF2C0] transition font-medium">
                    Add to Cart
                  </button>
                  <button className="px-6 py-3 border border-gray-600 rounded-lg hover:bg-red-600 transition"
                    onClick={() => removeProduct(product.id)}>
                    Remove Product
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Optional: Load more indicator */}
      {products.length === 0 && (
        <p className="text-center text-gray-500 py-12">No products found.</p>
      )}
    </div>
  );
};

export default ProductsList;
