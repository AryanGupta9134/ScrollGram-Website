import LoginLogoutButton from "../ui/LoginLogoutButton";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";
import Logo from "../ui/Logo";

const Navbar = () => {
  const { user, fName } = useContext(AuthContext);
  return (
    <div className="fixed top-0 w-full z-50 border-b border-white/10">
      <div className="flex justify-between items-center px-10 py-5 bg-transparent">
        <Logo />
        <div className="flex items-center gap-8">
          <p className="text-md font-medium text-white/90 hover:text-[#4DF2C0] transition">
            {user === true ? "Hello" + " " + fName : " "}
          </p>
          <LoginLogoutButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
