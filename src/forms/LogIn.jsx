import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const LogIn = () => {
  const { setUser, fName, setfName, userEmail, setUserEmail, lName, setlName } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const handleUserLogin = (e) => {
    e.preventDefault();

    if (!fName.trim() || !lName.trim() || !userEmail.trim()) {
      alert("Please fill all fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      alert("Please enter a valid email");
      return;
    }

    setUser({
      isAuthenticated: true,
      fName,
      lName,
      email: userEmail,
    });

    navigate("/dashboard");
  };

  return (
    <section className="w-full min-h-screen flex flex-col md:flex-row bg-black">
      <Navbar />

      {/* LEFT INFO */}
      <div
        className="w-full md:w-1/2 flex items-center justify-center 
                      px-6 sm:px-10 md:px-16 
                      pt-28 md:pt-0"
      >
        <div className="max-w-md space-y-5 sm:space-y-6 text-center md:text-left">
          <span className="text-xs sm:text-sm uppercase tracking-widest text-[#B39DFF] font-semibold">
            Welcome Back
          </span>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            Sign in to
            <br />
            <span className="text-[#3A7BFF]">ScrollGram</span>
          </h2>

          <p className="text-gray-300 text-base sm:text-lg">
            Continue your journey with smooth scrolling, premium visuals, and
            immersive content.
          </p>
        </div>
      </div>

      {/* RIGHT LOGIN FORM */}
      <div
        className="w-full md:w-1/2 flex items-center justify-center 
                      px-6 sm:px-10 mt-10 md:px-16 
                      pb-16 md:pb-0"
      >
        <div
          className="w-full max-w-md backdrop-blur-xl bg-white/5 
                        border border-white/10 rounded-3xl 
                        p-6 sm:p-8 md:p-10 shadow-2xl"
        >
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 text-center">
            Sign-In
          </h3>

          <form onSubmit={handleUserLogin} className="space-y-4">
            {/* Name Fields */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full">
                <label className="text-sm text-gray-300">First Name</label>
                <input
                  type="text"
                  value={fName}
                  onChange={(e) => setfName(e.target.value)}
                  placeholder="John..."
                  className="mt-2 w-full rounded-full bg-black/40 
                             border border-white/20 px-4 py-3 
                             text-white placeholder-gray-400 
                             focus:outline-none focus:border-[#3A7BFF]"
                />
              </div>

              <div className="w-full">
                <label className="text-sm text-gray-300">Last Name</label>
                <input
                  type="text"
                  value={lName}
                  onChange={(e) => setlName(e.target.value)}
                  placeholder="Doe..."
                  className="mt-2 w-full rounded-full bg-black/40 
                             border border-white/20 px-4 py-3 
                             text-white placeholder-gray-400 
                             focus:outline-none focus:border-[#3A7BFF]"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-gray-300">Email</label>
              <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-2 w-full rounded-full bg-black/40 
                           border border-white/20 px-4 py-3 
                           text-white placeholder-gray-400 
                           focus:outline-none focus:border-[#3A7BFF]"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-[#3A7BFF] text-white 
                         py-3 rounded-full font-semibold 
                         hover:bg-[#4DF2C0] transition shadow-lg 
                         mt-6 sm:mt-8"
            >
              Sign-In
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LogIn;
