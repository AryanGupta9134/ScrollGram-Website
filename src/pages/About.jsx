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
