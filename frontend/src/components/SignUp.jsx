import { useState } from "react";
import { assets } from "../assets/assets";
import { useLanguage } from "../context/LanguageContext";
import API from "../services/api";
import { toast } from "sonner";

const SignUp = ({ isOpen, onClose, onSwitchToLogin }) => {
  const { theme } = useLanguage();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    dateOfBirth: "",
    gender: "",
  });
  const [error, setError] = useState("");

  const isDark = theme === "dark";
  const themeClass = (light, dark) => (isDark ? dark : light);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSignUp = async () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.mobile ||
      !formData.dateOfBirth ||
      !formData.gender
    ) {
      const message = "All fields are required";
      setError(message);
      toast.error(message);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      const message = "Passwords do not match";
      setError(message);
      toast.error(message);
      return;
    }

    if (formData.password.length < 6) {
      const message = "Password must be at least 6 characters";
      setError(message);
      toast.error(message);
      return;
    }

    try {
      await API.post("/auth/register", formData);
      onClose();
      onSwitchToLogin();
      toast.success("Account created successfully. Please log in.");
    } catch (err) {
      const message = err.response?.data?.message || err.response?.data?.error || "Sign up failed";
      setError(message);
      toast.error(message);
    }
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
        <div
          className={`shadow-2xl w-full md:w-full md:max-w-md rounded-lg overflow-hidden animate-fadeInScale my-8 transition-colors duration-300 ${themeClass(
            "bg-white",
            "bg-gray-800"
          )}`}
        >
          {/* Header */}
          <div
            className={`flex items-center justify-between px-5 py-6 ${themeClass(
              "bg-gradient-to-r from-green-500 to-green-600",
              "bg-gradient-to-r from-green-600 to-green-700"
            )}`}
          >
            <div className="flex-1 flex flex-col items-center">
              <img src={assets.HMS} alt="Logo" className="w-20 h-20" />
              <h1 className="font-bold text-2xl text-white mt-2 drop-shadow-md">
                Create Account
              </h1>
            </div>
            <button
              onClick={onClose}
              className="close-btn transition-all duration-300 hover:scale-110 self-start"
            >
              <img src={assets.close_icon} alt="Close" className="w-6 h-6" />
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
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label
                  className={`font-semibold text-sm pb-1 block ${themeClass(
                    "text-gray-600",
                    "text-gray-400"
                  )}`}
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  className={`border-2 rounded-lg px-3 py-2 mt-1 text-sm w-full focus:outline-none focus:border-green-500 focus:ring-2 transition-all duration-300 ${themeClass(
                    "border-gray-300 bg-white text-gray-900 focus:ring-green-200",
                    "border-gray-600 bg-gray-700 text-gray-100 focus:ring-green-800"
                  )}`}
                />
              </div>
              <div>
                <label
                  className={`font-semibold text-sm pb-1 block ${themeClass(
                    "text-gray-600",
                    "text-gray-400"
                  )}`}
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  className={`border-2 rounded-lg px-3 py-2 mt-1 text-sm w-full focus:outline-none focus:border-green-500 focus:ring-2 transition-all duration-300 ${themeClass(
                    "border-gray-300 bg-white text-gray-900 focus:ring-green-200",
                    "border-gray-600 bg-gray-700 text-gray-100 focus:ring-green-800"
                  )}`}
                />
              </div>
            </div>

            {/* Email */}
            <div className="mb-4">
              <label
                className={`font-semibold text-sm pb-1 block ${themeClass(
                  "text-gray-600",
                  "text-gray-400"
                )}`}
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className={`border-2 rounded-lg px-3 py-2 mt-1 text-sm w-full focus:outline-none focus:border-green-500 focus:ring-2 transition-all duration-300 ${themeClass(
                  "border-gray-300 bg-white text-gray-900 focus:ring-green-200",
                  "border-gray-600 bg-gray-700 text-gray-100 focus:ring-green-800"
                )}`}
              />
            </div>

            {/* Mobile */}
            <div className="mb-4">
              <label
                className={`font-semibold text-sm pb-1 block ${themeClass(
                  "text-gray-600",
                  "text-gray-400"
                )}`}
              >
                Mobile Number
              </label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
                className={`border-2 rounded-lg px-3 py-2 mt-1 text-sm w-full focus:outline-none focus:border-green-500 focus:ring-2 transition-all duration-300 ${themeClass(
                  "border-gray-300 bg-white text-gray-900 focus:ring-green-200",
                  "border-gray-600 bg-gray-700 text-gray-100 focus:ring-green-800"
                )}`}
              />
            </div>

            {/* Date of Birth and Gender */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label
                  className={`font-semibold text-sm pb-1 block ${themeClass(
                    "text-gray-600",
                    "text-gray-400"
                  )}`}
                >
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className={`border-2 rounded-lg px-3 py-2 mt-1 text-sm w-full focus:outline-none focus:border-green-500 focus:ring-2 transition-all duration-300 ${themeClass(
                    "border-gray-300 bg-white text-gray-900 focus:ring-green-200",
                    "border-gray-600 bg-gray-700 text-gray-100 focus:ring-green-800"
                  )}`}
                />
              </div>
              <div>
                <label
                  className={`font-semibold text-sm pb-1 block ${themeClass(
                    "text-gray-600",
                    "text-gray-400"
                  )}`}
                >
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={`border-2 rounded-lg px-3 py-2 mt-1 text-sm w-full focus:outline-none focus:border-green-500 focus:ring-2 transition-all duration-300 ${themeClass(
                    "border-gray-300 bg-white text-gray-900 focus:ring-green-200",
                    "border-gray-600 bg-gray-700 text-gray-100 focus:ring-green-800"
                  )}`}
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Password */}
            <div className="mb-4">
              <label
                className={`font-semibold text-sm pb-1 block ${themeClass(
                  "text-gray-600",
                  "text-gray-400"
                )}`}
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="At least 6 characters"
                className={`border-2 rounded-lg px-3 py-2 mt-1 text-sm w-full focus:outline-none focus:border-green-500 focus:ring-2 transition-all duration-300 ${themeClass(
                  "border-gray-300 bg-white text-gray-900 focus:ring-green-200",
                  "border-gray-600 bg-gray-700 text-gray-100 focus:ring-green-800"
                )}`}
              />
            </div>

            {/* Confirm Password */}
            <div className="mb-6">
              <label
                className={`font-semibold text-sm pb-1 block ${themeClass(
                  "text-gray-600",
                  "text-gray-400"
                )}`}
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                className={`border-2 rounded-lg px-3 py-2 mt-1 text-sm w-full focus:outline-none focus:border-green-500 focus:ring-2 transition-all duration-300 ${themeClass(
                  "border-gray-300 bg-white text-gray-900 focus:ring-green-200",
                  "border-gray-600 bg-gray-700 text-gray-100 focus:ring-green-800"
                )}`}
              />
            </div>

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
          <div
            className={`py-5 border-t ${themeClass(
              "bg-gray-50 border-gray-200",
              "bg-gray-900 border-gray-700"
            )}`}
          >
            <div className="text-center whitespace-nowrap">
              <p
                className={`text-sm mb-3 ${themeClass(
                  "text-gray-600",
                  "text-gray-400"
                )}`}
              >
                Already have an account?{" "}
                <button
                  onClick={() => {
                    onClose();
                    onSwitchToLogin();
                  }}
                  className={`font-semibold transition-colors duration-200 ${themeClass(
                    "text-green-500 hover:text-green-600",
                    "text-green-400 hover:text-green-300"
                  )}`}
                >
                  Login here
                </button>
              </p>
            </div>
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

        .close-btn:hover img {
          filter: brightness(0) saturate(100%) invert(23%) sepia(77%)
            saturate(2141%) hue-rotate(0deg) brightness(101%) contrast(101%);
        }
      `}</style>
    </>
  );
};

export default SignUp;
