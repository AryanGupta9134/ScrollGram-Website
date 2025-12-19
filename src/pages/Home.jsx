import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import Navbar from "../components/Navbar";

const Home = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex h-screen">
          <div className="w-1/2 flex items-center justify-center">
            <img
              src="Home_img.png"
              alt="Home_Image"
              className="w-110 h-110 rounded-4xl"
            />
          </div>
          <div className="w-1/2 flex items-center justify-center px-16">
            <div className="max-w-md space-y-6">
              <span className="text-sm uppercase tracking-widest text-[#B39DFF] font-semibold">
                Designed to Flow
              </span>

              <h2 className="text-4xl font-extrabold text-white leading-tight">
                Scroll Less.
                <br />
                <span className="text-[#3A7BFF]">Discover More.</span>
              </h2>

              <p className="text-gray-300 text-lg">
                ScrollGram transforms the way you experience product — smooth,
                immersive, and thoughtfully designed for modern users.
              </p>

              <Link
                to={user ? "/dashboard" : "/login"}
                className="px-6 py-4 rounded-full border border-white/30 text-lg font-medium text-white hover:bg-[#4DF2C0] hover:text-black transition"
              >
                Let's Scroll ...
              </Link>
            </div>
          </div>
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Home;
