import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useLanguage } from "../context/LanguageContext";
import AppContext from "../context/AppContext";
import API from "../services/api";
import { toast } from "sonner";

const Login = ({
  isOpen,
  onClose,
  onSwitchToSignUp,
  onSwitchToForgotPassword,
}) => {
  const navigate = useNavigate();
  const { t, theme } = useLanguage();
  const { setAuth } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isDark = theme === "dark";
  const themeClass = (light, dark) => (isDark ? dark : light);

  // Ensure fields are blank whenever the modal opens (e.g., after logout)
  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
      setError("");
    }
  }, [isOpen]);

  const handleLogin = async () => {
    if (!email || !password) {
      const message = "Please enter email and password";
      setError(message);
      toast.error(message);
      return;
    }
    try {
      const { data } = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      setAuth({ token: data.token, user: data.user });
      onClose();
      toast.success("Logged in successfully");
      navigate("/my-profile");
    } catch (err) {
      const message = err.response?.data?.message || "Login failed";
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
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div
          className={`shadow-2xl w-full md:w-full md:max-w-md rounded-lg overflow-hidden animate-fadeInScale transition-colors duration-300 ${themeClass(
            "bg-white",
            "bg-gray-800"
          )}`}
        >
          <div
            className={`flex items-center justify-between px-5 py-6 ${themeClass(
              "bg-gradient-to-r from-blue-500 to-blue-600",
              "bg-gradient-to-r from-blue-600 to-blue-700"
            )}`}
          >
            <div className="flex-1 flex flex-col items-center">
              <img src={assets.HMS} alt="Logo" className="w-20 h-20" />
              <h1 className="font-bold text-2xl text-white mt-2 drop-shadow-md">
                {t("login.title")}
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
            {error && (
              <div className="mb-5 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 text-sm rounded">
                {error}
              </div>
            )}
            <label
              className={`font-semibold text-sm pb-1 block ${themeClass(
                "text-gray-600",
                "text-gray-400"
              )}`}
            >
              {t("login.email")}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              placeholder={t("login.emailPlaceholder")}
              className={`border-2 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:outline-none focus:border-blue-500 focus:ring-2 transition-all duration-300 ${themeClass(
                "border-gray-300 bg-white text-gray-900 focus:ring-blue-200",
                "border-gray-600 bg-gray-700 text-gray-100 focus:ring-blue-600"
              )}`}
            />

            <label
              className={`font-semibold text-sm pb-1 block ${themeClass(
                "text-gray-600",
                "text-gray-400"
              )}`}
            >
              {t("login.password")}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
              placeholder={t("login.passwordPlaceholder")}
              className={`border-2 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:outline-none focus:border-blue-500 focus:ring-2 transition-all duration-300 ${themeClass(
                "border-gray-300 bg-white text-gray-900 focus:ring-blue-200",
                "border-gray-600 bg-gray-700 text-gray-100 focus:ring-blue-600"
              )}`}
            />

            <button
              onClick={handleLogin}
              type="button"
              className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-md hover:shadow-lg font-semibold text-center inline-flex items-center justify-center gap-2"
            >
              <span>{t("login.loginButton")}</span>
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
          <div
            className={`border-t py-5 ${themeClass(
              "border-gray-200",
              "border-gray-700"
            )}`}
          >
            <div className="grid grid-cols-2 gap-1">
              <div className="text-center sm:text-left whitespace-nowrap">
                <button
                  onClick={() => {
                    onClose();
                    onSwitchToForgotPassword();
                  }}
                  className={`transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset ${themeClass(
                    "text-gray-500 hover:bg-gray-100 focus:bg-gray-200",
                    "text-gray-400 hover:bg-gray-700 focus:bg-gray-600"
                  )}`}
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
                  <span className="inline-block ml-1">
                    {t("login.forgotPassword")}
                  </span>
                </button>
              </div>
              <div className="text-center sm:text-right whitespace-nowrap">
                <button
                  onClick={() => {
                    onClose();
                    navigate("/contact");
                  }}
                  className={`transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset ${themeClass(
                    "text-gray-500 hover:bg-gray-100 focus:bg-gray-200",
                    "text-gray-400 hover:bg-gray-700 focus:bg-gray-600"
                  )}`}
                >
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
                {t("login.noAccount")}{" "}
                <button
                  onClick={() => {
                    onClose();
                    onSwitchToSignUp();
                  }}
                  className={`font-semibold transition-colors duration-200 ${themeClass(
                    "text-blue-500 hover:text-blue-600",
                    "text-blue-400 hover:text-blue-300"
                  )}`}
                >
                  {t("login.signUp")}
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

export default Login;
