import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";

const LoginLogoutButton = () => {
  const navigate = useNavigate();
  const { setUser, user } = useContext(AuthContext);
  
  return (
    <button
      onClick={() => (user ? setUser(false) : navigate("/login"))}
      className="px-6 py-2 rounded-full border border-white/30 text-sm font-medium text-white hover:bg-gray-300 hover:text-black transition"
    >
      {user.isAuthenticated ? "Logout" : "Sign-In"}
    </button>
  );
};

export default LoginLogoutButton;
