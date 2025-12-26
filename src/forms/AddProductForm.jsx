import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const AddProductForm = ({ closeForm, addProduct }) => {
  const { productAddFormData, setProductAddFormData, updateProduct } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductAddFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      id: Date.now(),
      title: productAddFormData.title || "Untitled",
      description: productAddFormData.description || "",
      price: productAddFormData.price || 0,
      category: productAddFormData.category || "uncategorized",
      brand: productAddFormData.brand || "Unknown",
      thumbnail:
        productAddFormData.thumbnail || "https://via.placeholder.com/150",
    };

    addProduct(newProduct);

    setProductAddFormData({
      title: "",
      description: "",
      price: "",
      category: "",
      brand: "",
      thumbnail: "",
    });

    closeForm();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
      <form
        onSubmit={handleFormSubmit}
        className="w-full max-w-lg bg-gray-900 border border-gray-700 rounded-2xl p-6 space-y-5"
      >
        <h2 className="text-2xl font-bold text-white text-center">
          {updateProduct ? "Update Product" : "Add New Product"}
        </h2>

        <input
          name="title"
          value={productAddFormData.title}
          onChange={handleChange}
          placeholder="Product Title"
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg outline-none"
          required
        />

        <textarea
          name="description"
          value={productAddFormData.description}
          onChange={handleChange}
          placeholder="Product Description"
          rows="3"
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg outline-none resize-none"
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="number"
            name="price"
            value={productAddFormData.price}
            onChange={handleChange}
            placeholder="Price ($)"
            className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg outline-none"
            required
          />
          <input
            name="brand"
            value={productAddFormData.brand}
            onChange={handleChange}
            placeholder="Brand"
            className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg outline-none"
          />
        </div>

        <select
          name="category"
          value={productAddFormData.category}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg outline-none"
          required
        >
          <option value="">Select Category</option>
          <option value="beauty">Beauty</option>
          <option value="fragrances">Fragrances</option>
          <option value="furniture">Furniture</option>
          <option value="groceries">Groceries</option>
        </select>

        <input
          name="thumbnail"
          type="url"
          value={productAddFormData.thumbnail}
          onChange={handleChange}
          placeholder="Thumbnail Image URL"
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg outline-none"
          required
        />

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={closeForm}
            className="px-5 py-2 rounded-lg border border-gray-600 hover:bg-gray-800"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-[#4DF2C0] text-black font-semibold hover:opacity-90"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
