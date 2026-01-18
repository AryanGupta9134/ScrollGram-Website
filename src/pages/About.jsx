const About = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 px-4 sm:px-6 lg:px-12 py-10">
      <div className="max-w-6xl mx-auto space-y-16">

        {/* HEADER */}
        <section className="text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#4DF2C0]">
            About This Application
          </h1>
          <p className="text-gray-400 max-w-3xl mx-auto text-sm sm:text-base">
            A modern, scalable React application built with clean architecture,
            efficient state management, and real-world development practices.
          </p>
        </section>

        {/* FEATURES */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            ["Fully Responsive UI", "Mobile-first design that adapts seamlessly to all screen sizes."],
            ["Instagram-like Product Scrolling", "Smooth, scroll-based product browsing experience."],
            ["Product Detail Pages", "Each product opens on a dedicated page with full details."],
            ["Protected Dashboard", "Authentication-based route protection using context."],
            ["Wishlist & Cart", "Add, remove, and manage products in real time."],
            ["React Query", "Efficient data fetching, caching, and synchronization."],
            ["Context API", "Global state management for auth and shared data."],
            ["Add/Edit Product Forms", "Reusable forms for creating and updating products."],
            ["Clean Code Structure", "Organized file structure for scalability and maintainability."],
            ["Tailwind CSS", "Utility-first styling for rapid UI development."],
            ["Real-world Practices", "Built with best practices for modern React development."],
            ["Extensive Documentation", "Clear code comments and architecture overview."],
            ["Open Source", "Easily extendable and customizable for your own projects."],
            ["Performance Optimized", "Fast load times and smooth interactions."],
            ["File Structure Overview", "Logical organization of components, pages, and context."],
          ].map(([title, desc]) => (
            <div
              key={title}
              className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-[#4DF2C0] transition"
            >
              <h3 className="text-lg font-semibold mb-2">{title}</h3>
              <p className="text-gray-400 text-sm">{desc}</p>
            </div>
          ))}
        </section>

        {/* ARCHITECTURE OVERVIEW */}
        <section className="space-y-8">
          <h2 className="text-2xl font-bold text-[#4DF2C0] text-center">
            Application Architecture & Data Flow
          </h2>

          {/* ROOT FLOW */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 space-y-4">
            <h3 className="text-xl font-semibold text-white">
              Root Component Flow
            </h3>

            <pre className="bg-gray-900 text-gray-300 text-sm p-4 rounded-lg overflow-x-auto">
{`<AuthProvider>
  <QueryClientProvider>
    <App />
  </QueryClientProvider>
</AuthProvider>`}
            </pre>

            <p className="text-gray-400 text-sm">
              The entire application is wrapped with <span className="text-[#4DF2C0]">AuthContext</span> for
              global state and <span className="text-[#4DF2C0]">React Query</span> for server state management.
            </p>
          </div>

          {/* FILE STRUCTURE */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 space-y-4">
            <h3 className="text-xl font-semibold text-white">
              File Structure Overview
            </h3>

            <pre className="bg-gray-900 text-gray-300 text-sm p-4 rounded-lg overflow-x-auto">
{`src/
 ├── context/
 │    └── AuthContext.jsx
 ├── api/
 │    └── ProductsList.jsx
 ├── forms/
 │    └── AddProductForm.jsx
 ├── pages/
 │    ├── Dashboard.jsx
 │    ├── About.jsx
 │    └── ProductDetails.jsx
 ├── components/
 │    └── Sidebar.jsx`}
            </pre>
          </div>

          {/* DATA FLOW */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-[#4DF2C0] mb-3">
                Global State (Context API)
              </h3>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>• Authentication state</li>
                <li>• Wishlist & cart data</li>
                <li>• Editing product state</li>
                <li>• Shared form state</li>
              </ul>
              <p className="mt-3 text-gray-500 text-xs">
                File: <code>src/context/AuthContext.jsx</code>
              </p>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-[#4DF2C0] mb-3">
                Server State (React Query)
              </h3>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>• Fetch products from API</li>
                <li>• Cache product data</li>
                <li>• Update UI after CRUD actions</li>
              </ul>
              <p className="mt-3 text-gray-500 text-xs">
                Hook: <code>useQuery</code>, <code>useQueryClient</code>
              </p>
            </div>
          </div>

          {/* FORM FLOW */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 space-y-4">
            <h3 className="text-xl font-semibold text-white">
              Add / Edit Product Flow
            </h3>

            <pre className="bg-gray-900 text-gray-300 text-sm p-4 rounded-lg overflow-x-auto">
{`ProductsList.jsx
  ↓ (Edit button)
setEditingProduct(product)
setUpdateProduct(true)

AddProductForm.jsx
  ↓
useEffect() fills form
  ↓
Submit → React Query cache update`}
            </pre>

            <p className="text-gray-400 text-sm">
              The same form handles both add and update operations using
              conditional logic and shared state.
            </p>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="text-center pt-6 border-t border-gray-800">
          <p className="text-gray-500 text-sm">
            This project demonstrates real-world React architecture, clean data
            flow, and scalable component design.
          </p>
        </footer>

      </div>
    </div>
  );
};

export default About;
