import React from 'react';
import { useLogout } from '../Hooks/useLogout';
import { useAuthContext } from '../Hooks/useAuthContext';
import cf from "../Utility/cf.png";
import logo from "../Utility/logo.jpg";

const Header = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const handle = user?.result[0]?.handle;

  const handleClick = () => {
    logout();
  };

  return (
    <div className="bg-gray-800 p-4 md:p-8 mb-6 flex flex-col md:flex-row items-center justify-between">
      <div className="flex items-center space-x-4 mb-4 md:mb-0">
        <img src={cf} alt="Codeforces Logo" className="w-10 h-10" />
        <h1 className="text-white text-lg md:text-2xl font-extrabold tracking-tight">
          Codeforces Wrapped 2023
        </h1>
      </div>
      <div className="flex items-center space-x-4">
        <img src={logo} alt="Logo" className="w-11 h-11 rounded-full" />
        <h2 className="text-white text-md md:text-lg font-semibold">
          {handle}
        </h2>
        <button
          onClick={handleClick}
          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 focus:outline-none focus:shadow-outline-red transition duration-300"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Header;
