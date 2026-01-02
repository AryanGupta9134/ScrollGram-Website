import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import Navbar from "../components/Navbar";

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        {/* Main Section */}
        <div className="flex flex-col md:flex-row flex-1 pt-24">
          {/* Image Section */}
          <div className="w-full md:w-1/2 flex items-center justify-center px-4 md:px-0">
            <img
              src="Home_img.png"
              alt="Home_Image"
              className="
    w-full rounded-xl
    max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg
    max-h-55 sm:max-h-70 md:max-h-85 lg:max-h-105
    object-contain
    mb-8 md:mb-0
  "
            />
          </div>

          {/* Content Section */}
          <div className="w-full md:w-1/2 flex items-center justify-center px-6 sm:px-10 md:px-16">
            <div className="max-w-md space-y-5 sm:space-y-6 text-center md:text-left">
              <span className="text-xs sm:text-sm uppercase tracking-widest text-[#B39DFF] font-semibold">
                Designed to Flow
              </span>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                Scroll Less.
                <br />
                <span className="text-[#3A7BFF]">Discover More.</span>
              </h2>

              <p className="text-gray-300 text-base sm:text-lg">
                ScrollGram transforms the way you experience product — smooth,
                immersive, and thoughtfully designed for modern users.
              </p>

              <Link
                to={user ? "/dashboard" : "/login"}
                className="inline-block px-6 py-3 sm:py-4 mb-4 rounded-full 
                           border border-white/30 text-base sm:text-lg 
                           font-medium text-white 
                           hover:bg-[#4DF2C0] hover:text-black transition"
              >
                Let's Scroll ...
              </Link>
            </div>
          </div>
        </div>

          <Footer/>

      </div>
    </>
  );
};

export default Home;
