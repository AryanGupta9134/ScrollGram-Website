import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const ProfileEditForm = ({ closeForm }) => {
  const { fName, lName, setfName, setlName } = useContext(AuthContext);

  // 🧠 LOCAL STATE (buffer)
  const [firstName, setFirstName] = useState(fName);
  const [lastName, setLastName] = useState(lName);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🛑 VALIDATION
    if (!firstName.trim() || !lastName.trim()) {
      setError("Both first and last name are required");
      return;
    }

    // ✅ SAVE TO CONTEXT ONLY ON SAVE
    setfName(firstName.trim());
    setlName(lastName.trim());

    closeForm();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="w-[320px] bg-black border border-white/10
                   rounded-lg p-6 shadow-xl
                   flex flex-col gap-4"
      >
        <h2 className="text-xl font-semibold text-center text-[#4DF2C0]">
          Edit Profile
        </h2>

        {/* ERROR */}
        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

        {/* First Name */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-400">First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="px-3 py-2 rounded-md bg-gray-900 text-white
                       border border-white/10
                       focus:outline-none focus:ring-1 focus:ring-[#4DF2C0]"
          />
        </div>

        {/* Last Name */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-400">Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="px-3 py-2 rounded-md bg-gray-900 text-white
                       border border-white/10
                       focus:outline-none focus:ring-1 focus:ring-[#4DF2C0]"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-2">
          <button
            type="button"
            onClick={closeForm}
            className="flex-1 py-2 rounded-md bg-gray-800
                       hover:bg-gray-700 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="flex-1 py-2 rounded-md bg-[#4DF2C0]
                       text-black font-medium
                       hover:opacity-90 transition"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEditForm;
