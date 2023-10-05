import React from 'react'
import { Link } from "react-router-dom";
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  // console.log(user);
  const getInitials = (name) => {
    const names = name.split(" ");
    return names.map((n) => n[0]).join("");
  };
  const handleClick = () => {
    logout();
}

  return (
    <header className="bg-indigo-500 text-white">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link
          to="/"
          className="flex title-font font-medium items-center text-white mb-4 md:mb-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            className="w-10 h-10 p-2 bg-white text-indigo-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl">E-Store</span>
        </Link>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Link to="/" className="mr-5 hover:text-gray-900">
            Home
          </Link>
          <Link to="/products" className="mr-5 hover:text-gray-900">
            Products
          </Link>
          <Link to="/order" className="mr-5 hover:text-gray-900">
            Order
          </Link>
          <Link to="/cart" className="mr-5 hover:text-gray-900">
            Cart
          </Link>
        </nav>
        <div className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          {user ? (
            <div className="flex items-center mr-4">
              <div className="w-10 h-10 bg-white text-indigo-500 rounded-full flex items-center justify-center text-2xl font-normal mx-4">
                {getInitials(user.user.name)}
              </div>
              {/* <span className="font-semibold text-lg text-white ml-2">
                {user.user.name}
              </span> */}
              <button
                onClick={handleClick}
                className="text-indigo-200 hover:text-white"
              >
                Logout
              </button>
            </div>
          ) : (
            <div>
              <button className="bg-white text-indigo-500 hover:bg-indigo-600 py-2 px-4 rounded-full">
                <Link to="/login">Login</Link>
              </button>
              {/* <button>
                <Link to="/signup">Signup</Link>
              </button> */}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar