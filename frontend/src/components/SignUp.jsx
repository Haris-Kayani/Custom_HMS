import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLogo from "./AuthLogo";

const SignUp = ({ isOpen, onClose, onSwitchToLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSignUp = () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("All fields are required");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    // You can add actual signup logic here
    onClose();
    navigate("/");
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay with Blur Effect */}
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4 overflow-y-auto">
        <div className="bg-white shadow-2xl w-full md:w-full md:max-w-md rounded-lg overflow-hidden animate-fadeInScale my-8">
          {/* Header */}
          <div className="flex items-center justify-between bg-gradient-to-r from-green-500 to-green-600 px-5 py-6">
            <div className="flex-1 flex flex-col items-center">
              <AuthLogo variant="plus" size="w-20 h-20" iconSize="w-8 h-8" />
              <h1 className="font-bold text-2xl text-white mt-2 drop-shadow-md">
                Create Account
              </h1>
            </div>
            <button
              onClick={onClose}
              className="text-white text-2xl hover:text-gray-200 transition-colors duration-300"
            >
              ✕
            </button>
          </div>

          {/* Form Section */}
          <div className="px-5 py-7">
            {/* Error Message */}
            {error && (
              <div className="mb-5 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 text-sm rounded">
                {error}
              </div>
            )}

            {/* First Name and Last Name */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div>
                <label className="font-semibold text-sm text-gray-600 pb-1 block">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  className="border-2 border-gray-300 rounded-lg px-3 py-2 mt-1 text-sm w-full focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                />
              </div>
              <div>
                <label className="font-semibold text-sm text-gray-600 pb-1 block">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  className="border-2 border-gray-300 rounded-lg px-3 py-2 mt-1 text-sm w-full focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                />
              </div>
            </div>

            {/* Email */}
            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className="border-2 border-gray-300 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
            />

            {/* Phone */}
            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 (555) 000-0000"
              className="border-2 border-gray-300 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
            />

            {/* Password */}
            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="At least 6 characters"
              className="border-2 border-gray-300 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
            />

            {/* Confirm Password */}
            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              className="border-2 border-gray-300 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
            />

            {/* Sign Up Button */}
            <button
              onClick={handleSignUp}
              type="button"
              className="transition duration-200 bg-green-500 hover:bg-green-600 focus:bg-green-700 focus:shadow-sm focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-md hover:shadow-lg font-semibold text-center inline-flex items-center justify-center gap-2"
            >
              <span>Create Account</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </button>
          </div>

          {/* Switch to Login */}
          <div className="border-t border-gray-200 py-5 bg-gray-50">
            <div className="text-center whitespace-nowrap">
              <p className="text-gray-600 text-sm mb-3">
                Already have an account?{" "}
                <button
                  onClick={() => {
                    onClose();
                    onSwitchToLogin();
                  }}
                  className="text-green-500 font-semibold hover:text-green-600 transition-colors duration-200"
                >
                  Login here
                </button>
              </p>
            </div>
          </div>

          {/* Close Button */}
          <div className="py-3 bg-gray-100 border-t border-gray-200 flex justify-center">
            <button
              onClick={onClose}
              className="transition duration-200 px-6 py-2 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-4 h-4 inline-block align-text-top mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span className="inline-block ml-1">Close</span>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeInScale {
          animation: fadeInScale 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default SignUp;
