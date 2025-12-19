import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link
      to="/"
      className="text-xl font-semibold tracking-widest text-white hover:text-[#4DF2C0] transition"
    >
      ScrollGram
    </Link>
  );
};

export default Logo;
