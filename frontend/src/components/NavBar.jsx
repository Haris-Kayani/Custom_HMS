import { NavLink, useNavigate, Link } from "react-router-dom";
import { useState, useRef } from "react";
import { assets } from "../assets/assets";

const NavBar = () => {
  const navigate = useNavigate();
  // const [menu, setMenu] = useState(false);
  const [token, setToken] = useState(true);
  const [open, setOpen] = useState(false);
  const timerRef = useRef(null);

  const handleMouseEnter = () => {
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => {
      setOpen(false);
    }, 1000); // 1 second timer
  };

  return (
    <div className="flex items-center justify-between text-sm py-1 mb-5 border-b border-b-gray-400">
      {/* Logo */}
      <Link to="/">
        <img className="w-44 cursor-pointer" src="/NPH.png" alt="Home Logo" />
      </Link>

      {/* Nav Links */}
      <ul className="hidden md:flex items-center gap-8 font-medium">
        <li>
          <NavLink to="/" className="group flex flex-col items-center text-lg">
            {({ isActive }) => (
              <>
                Home
                <span
                  className={`block h-0.5 w-3/5 transition-transform duration-300 origin-left
                    ${
                      isActive
                        ? "bg-blue-500 scale-x-100"
                        : "bg-blue-500 scale-x-0 group-hover:scale-x-100"
                    }`}
                ></span>
              </>
            )}
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/docters"
            className="group flex flex-col items-center text-lg"
          >
            {({ isActive }) => (
              <>
                All Doctors
                <span
                  className={`block h-0.5 w-3/5 transition-transform duration-300 origin-left
                    ${
                      isActive
                        ? "bg-blue-500 scale-x-100"
                        : "bg-blue-500 scale-x-0 group-hover:scale-x-100"
                    }`}
                ></span>
              </>
            )}
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/contact"
            className="group flex flex-col items-center text-lg"
          >
            {({ isActive }) => (
              <>
                Contact Us
                <span
                  className={`block h-0.5 w-3/5 transition-transform duration-300 origin-left
                    ${
                      isActive
                        ? "bg-blue-500 scale-x-100"
                        : "bg-blue-500 scale-x-0 group-hover:scale-x-100"
                    }`}
                ></span>
              </>
            )}
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/about"
            className="group flex flex-col items-center text-lg"
          >
            {({ isActive }) => (
              <>
                About
                <span
                  className={`block h-0.5 w-3/5 transition-transform duration-300 origin-left
                    ${
                      isActive
                        ? "bg-blue-500 scale-x-100"
                        : "bg-blue-500 scale-x-0 group-hover:scale-x-100"
                    }`}
                ></span>
              </>
            )}
          </NavLink>
        </li>
      </ul>

      {/* Right Side */}
      {token ? (
        // Profile Dropdown
        <div
          className="flex items-center gap-2 cursor-pointer relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <img
            className="w-8 rounded-full"
            src={assets.profile_pic}
            alt="container_profile_pic"
          />
          <img
            className="w-2"
            src={assets.dropdown_icon}
            alt="dropdown"
            onClick={() => setOpen(false)} // closes immediately on icon click
          />

          {open && (
            <div className="absolute top-12 right-0 bg-white border border-gray-200 rounded-md shadow-md p-2 flex flex-col items-center gap-2 z-50">
              <div className="min-w-40 bg-white rounded flex flex-col gap-4 p-4">
                <p
                  className="text-gray-700 hover:text-black hover:font-bold cursor-pointer"
                  onClick={() => navigate("/my-profile")}
                >
                  My Profile
                </p>
                <p
                  className="text-gray-700 hover:text-black hover:font-bold cursor-pointer"
                  onClick={() => navigate("/my-appointments")}
                >
                  My Appointments
                </p>
                <p
                  className="text-gray-700 hover:text-black hover:font-bold cursor-pointer"
                  onClick={() => {
                    setToken(false);
                    navigate("/");
                    setOpen(false);
                  }}
                >
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        // CTA Button
        <button
          onClick={() => {
            navigate("/login");
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300"
        >
          Sign In
        </button>
      )}
    </div>
  );
};

export default NavBar;
