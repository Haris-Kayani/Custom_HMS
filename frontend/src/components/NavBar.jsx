import { NavLink, useNavigate, Link } from "react-router-dom";
import { useState, useRef } from "react";
import { assets } from "../assets/assets";
import Login from "./Login";
import SignUp from "./SignUp";
import ForgotPassword from "./ForgotPassword";
import { useLanguage } from "../context/LanguageContext";

const NavBar = () => {
  const navigate = useNavigate();
  const { t, theme } = useLanguage();
  const [token, setToken] = useState(true);
  const [open, setOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const timerRef = useRef(null);

  // ============================================
  // THEME HELPER: Compute classes based on theme
  // ============================================
  const isDark = theme === "dark";

  /**
   * Helper function to return light or dark class based on current theme
   * @param {string} lightClass - Class(es) to apply in light mode
   * @param {string} darkClass - Class(es) to apply in dark mode
   * @returns {string} - The appropriate class string
   */
  const themeClass = (lightClass, darkClass) => (isDark ? darkClass : lightClass);

  // ============================================
  // EVENT HANDLERS
  // ============================================
  const handleMouseEnter = () => {
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => {
      setOpen(false);
    }, 1000);
  };

  return (
    <div
      className={`flex items-center justify-between text-sm py-1 mb-5 border-b transition-colors duration-300 ${themeClass(
        "border-b-gray-400",
        "border-b-gray-600"
      )}`}
    >
      {/* ============================================
          LOGO: Switches based on theme state
          ============================================ */}
      <Link to="/">
        <img
          src={isDark ? "/NPH-white.png" : "/NPH.png"}
          alt="Home Logo"
          className="w-44 cursor-pointer"
        />
      </Link>

      {/* ============================================
          NAV LINKS
          ============================================ */}
      <ul className="hidden md:flex items-center gap-8 font-medium">
        {/* Home Link with Icon */}
        <li>
          <NavLink to="/" className="group flex flex-col items-center text-lg">
            {({ isActive }) => (
              <>
                <div className="relative flex flex-col items-center">
                  <img
                    src={assets.home_icon}
                    alt="Home"
                    className={`w-6 h-6 transition-opacity duration-300 group-hover:opacity-0 ${themeClass(
                      "",
                      "invert brightness-90"
                    )}`}
                  />
                  <span
                    className={`absolute top-0 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-lg font-medium ${themeClass(
                      "text-gray-800",
                      "text-gray-200"
                    )}`}
                  >
                    {t("navBar.home")}
                  </span>
                </div>
                <span
                  className={`block h-0.5 w-3/5 transition-transform duration-300 origin-left ${
                    isActive
                      ? "bg-blue-500 scale-x-100"
                      : "bg-blue-500 scale-x-0 group-hover:scale-x-100"
                  }`}
                ></span>
              </>
            )}
          </NavLink>
        </li>

        {/* All Doctors Link */}
        <li>
          <NavLink
            to="/doctors"
            className={`group flex flex-col items-center text-lg ${themeClass(
              "text-gray-800",
              "text-gray-200"
            )}`}
          >
            {({ isActive }) => (
              <>
                {t("navBar.allDoctors")}
                <span
                  className={`block h-0.5 w-3/5 transition-transform duration-300 origin-left ${
                    isActive
                      ? "bg-blue-500 scale-x-100"
                      : "bg-blue-500 scale-x-0 group-hover:scale-x-100"
                  }`}
                ></span>
              </>
            )}
          </NavLink>
        </li>

        {/* Contact Link */}
        <li>
          <NavLink
            to="/contact"
            className={`group flex flex-col items-center text-lg ${themeClass(
              "text-gray-800",
              "text-gray-200"
            )}`}
          >
            {({ isActive }) => (
              <>
                {t("navBar.contact")}
                <span
                  className={`block h-0.5 w-3/5 transition-transform duration-300 origin-left ${
                    isActive
                      ? "bg-blue-500 scale-x-100"
                      : "bg-blue-500 scale-x-0 group-hover:scale-x-100"
                  }`}
                ></span>
              </>
            )}
          </NavLink>
        </li>

        {/* About Link */}
        <li>
          <NavLink
            to="/about"
            className={`group flex flex-col items-center text-lg ${themeClass(
              "text-gray-800",
              "text-gray-200"
            )}`}
          >
            {({ isActive }) => (
              <>
                {t("navBar.about")}
                <span
                  className={`block h-0.5 w-3/5 transition-transform duration-300 origin-left ${
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

      {/* ============================================
          RIGHT SIDE: Profile Dropdown or CTA Button
          ============================================ */}
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
            className={`w-2 ${themeClass("", "invert")}`}
            src={assets.dropdown_icon}
            alt="dropdown"
            onClick={() => setOpen(false)}
          />

          {/* ============================================
              DROPDOWN MENU: Theme-aware styling
              ============================================ */}
          {open && (
            <div
              className={`absolute top-12 right-0 rounded-md shadow-md p-2 flex flex-col items-center gap-2 z-50 transition-colors duration-300 border ${themeClass(
                "bg-white border-gray-200",
                "bg-gray-800 border-gray-700"
              )}`}
            >
              <div className="min-w-40 rounded flex flex-col gap-4 p-4">
                {/* My Profile */}
                <p
                  className={`cursor-pointer transition-colors duration-200 ${themeClass(
                    "text-gray-700 hover:text-black hover:font-bold",
                    "text-gray-300 hover:text-white hover:font-bold"
                  )}`}
                  onClick={() => navigate("/my-profile")}
                >
                  {t("navBar.myProfile")}
                </p>

                {/* My Appointments */}
                <p
                  className={`cursor-pointer transition-colors duration-200 ${themeClass(
                    "text-gray-700 hover:text-black hover:font-bold",
                    "text-gray-300 hover:text-white hover:font-bold"
                  )}`}
                  onClick={() => navigate("/my-appointments")}
                >
                  {t("navBar.myAppointments")}
                </p>

                {/* Logout */}
                <p
                  className={`cursor-pointer transition-colors duration-200 ${themeClass(
                    "text-gray-700 hover:text-black hover:font-bold",
                    "text-gray-300 hover:text-white hover:font-bold"
                  )}`}
                  onClick={() => {
                    setToken(false);
                    navigate("/");
                    setOpen(false);
                  }}
                >
                  {t("navBar.logout")}
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        // CTA Button - Always blue, no theme variation needed
        <button
          onClick={() => {
            setLoginOpen(true);
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300"
        >
          {t("navBar.createAccount")}
        </button>
      )}

      {/* ============================================
          MODALS: Login, SignUp, ForgotPassword
          ============================================ */}
      <Login
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        onSwitchToSignUp={() => setSignUpOpen(true)}
        onSwitchToForgotPassword={() => setForgotPasswordOpen(true)}
      />

      <SignUp
        isOpen={signUpOpen}
        onClose={() => setSignUpOpen(false)}
        onSwitchToLogin={() => setLoginOpen(true)}
      />

      <ForgotPassword
        isOpen={forgotPasswordOpen}
        onClose={() => setForgotPasswordOpen(false)}
        onSwitchToLogin={() => setLoginOpen(true)}
      />
    </div>
  );
};

export default NavBar;
