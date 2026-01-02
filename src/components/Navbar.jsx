import LoginLogoutButton from "../ui/LoginLogoutButton";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";
import Logo from "../ui/Logo";

const Navbar = () => {
  const { user, fName } = useContext(AuthContext);

  return (
    <div className="fixed top-0 w-full z-50 border-b border-white/10">
      <div
        className="flex justify-between items-center 
        px-4 sm:px-6 md:px-10 
        py-3 sm:py-4 md:py-5 
        bg-transparent"
      >
        {/* Logo */}
        <Logo />

        {/* Right section */}
        <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
          <p
            className="hidden sm:block text-sm md:text-md font-medium 
            text-white/90 hover:text-[#4DF2C0] transition"
          >
            {user === true ? "Hello " + fName : " "}
          </p>

          <LoginLogoutButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
