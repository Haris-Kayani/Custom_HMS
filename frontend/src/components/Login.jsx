import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLogo from "./AuthLogo";

const Login = ({ isOpen, onClose, onSwitchToSignUp, onSwitchToForgotPassword }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email && password) {
      // You can add actual login logic here
      onClose();
      navigate("/my-profile");
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
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white shadow-2xl w-full md:w-full md:max-w-md rounded-lg overflow-hidden animate-fadeInScale">
                          <div className="flex items-center justify-between bg-gradient-to-r from-blue-500 to-blue-600 px-5 py-6">
                            <div className="flex-1 flex flex-col items-center">
                              <AuthLogo variant="plus" size="w-20 h-20" iconSize="w-8 h-8" />
                              <h1 className="font-bold text-2xl text-white mt-2 drop-shadow-md">
                                National Police Hospital
                              </h1>
                            </div>
                            <button
                              onClick={onClose}
                              className="text-white text-2xl hover:text-gray-200 transition-colors duration-200"
                            >
                              ✕
                            </button>
                          </div>

                          {/* Form Section */}
          <div className="px-5 py-7">
            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="border-2 border-gray-300 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
            />

            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="border-2 border-gray-300 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
            />

            <button
              onClick={handleLogin}
              type="button"
              className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-md hover:shadow-lg font-semibold text-center inline-flex items-center justify-center gap-2"
            >
              <span>Login</span>
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
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="border-t border-gray-200 py-5">
            <div className="grid grid-cols-2 gap-1">
              <div className="text-center sm:text-left whitespace-nowrap">
                <button
                  onClick={() => {
                    onClose();
                    onSwitchToForgotPassword();
                  }}
                  className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-4 h-4 inline-block align-text-top"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="inline-block ml-1">Forgot Password</span>
                </button>
              </div>
              <div className="text-center sm:text-right whitespace-nowrap">
                <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-4 h-4 inline-block align-text-bottom"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  <span className="inline-block ml-1">Help</span>
                </button>
              </div>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="py-5 bg-gray-50 border-t border-gray-200">
            <div className="text-center whitespace-nowrap">
              <p className="text-gray-600 text-sm mb-3">
                Don't have an account?{" "}
                <button
                  onClick={() => {
                    onClose();
                    onSwitchToSignUp();
                  }}
                  className="text-blue-500 font-semibold hover:text-blue-600 transition-colors duration-200"
                >
                  Sign up here
                </button>
              </p>
            </div>
          </div>

          {/* Back Button */}
          <div className="py-5 bg-gray-50 border-t border-gray-200">
            <div className="grid grid-cols-1">
              <div className="text-center sm:text-left whitespace-nowrap">
                <button
                  onClick={onClose}
                  className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-200 focus:outline-none focus:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-4 h-4 inline-block align-text-top"
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

export default Login;
