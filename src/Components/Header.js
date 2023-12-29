import React from "react";
import { useLogout } from "../Hooks/useLogout";
import { useAuthContext } from "../Hooks/useAuthContext";

const Header = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const handle = user?.result[0]?.handle;

  const handleClick = () => {
    logout();
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between py-4 px-4 md:px-8 bg-gray-800">
      <h3 className="text-white text-lg font-bold mb-2 md:mb-0">
        Codeforces Wrapped 2023
      </h3>
      <div className="flex items-center">
        <h3 className="text-white text-lg mr-2 md:mr-4">{handle}</h3>
        <button
          onClick={handleClick}
          className="bg-red-500 text-white px-2 md:px-3 py-1 rounded-md hover:bg-red-600 focus:outline-none focus:shadow-outline-red transition duration-300"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Header;