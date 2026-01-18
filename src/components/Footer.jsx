import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="border-t border-gray-800">
        <p
          className="text-center text-gray-400 
          px-4 py-3 sm:py-4 
          text-xs sm:text-sm md:text-base 
          "
        >
          <span className="hover:text-[#4DF2C0] transition">
            © 2025 ScrollGram. All rights reserved
          </span>{" "}
          ||{" "}
          <span className="hover:text-blue-500">
            <Link to={"/about"}>About Us</Link>
          </span>
        </p>
      </div>
    </>
  );
};

export default Footer;
