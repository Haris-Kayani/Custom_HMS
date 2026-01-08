import { useState } from "react";
import { assets } from "../assets/assets";
import { useLanguage } from "../context/LanguageContext";
import { toast } from "sonner";

const ForgotPassword = ({ isOpen, onClose, onSwitchToLogin }) => {
  const { theme } = useLanguage();
  const [email, setEmail] = useState("");
  const [step, setStep] = useState("email"); // "email", "otp", "newPassword"
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const isDark = theme === "dark";
  const themeClass = (light, dark) => (isDark ? dark : light);

  const handleSendOTP = () => {
    if (!email) {
      const message = "Please enter your email address";
      setError(message);
      toast.error(message);
      return;
    }

    if (!email.includes("@")) {
      const message = "Please enter a valid email address";
      setError(message);
      toast.error(message);
      return;
    }

    // Simulate sending OTP
    setMessage("OTP sent to your email address");
    setError("");
    setStep("otp");
    toast.success("OTP sent successfully");
  };

  const handleVerifyOTP = () => {
    if (!otp) {
      const message = "Please enter the OTP";
      setError(message);
      toast.error(message);
      return;
    }

    if (otp.length !== 6) {
      const message = "OTP must be 6 digits";
      setError(message);
      toast.error(message);
      return;
    }

    setMessage("OTP verified successfully");
    setError("");
    setStep("newPassword");
    toast.success("OTP verified");
  };

  const handleResetPassword = () => {
    if (!newPassword || !confirmPassword) {
      const message = "Please enter both passwords";
      setError(message);
      toast.error(message);
      return;
    }

    if (newPassword !== confirmPassword) {
      const message = "Passwords do not match";
      setError(message);
      toast.error(message);
      return;
    }

    if (newPassword.length < 6) {
      const message = "Password must be at least 6 characters";
      setError(message);
      toast.error(message);
      return;
    }

    // Simulate password reset
    setMessage(
      "Password reset successfully. Please login with your new password."
    );
    setError("");
    toast.success("Password reset successfully");
    setTimeout(() => {
      onClose();
      onSwitchToLogin();
    }, 2000);
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
          className={`shadow-2xl w-full md:w-full md:max-w-md rounded-lg overflow-hidden animate-fadeInScale transition-colors duration-300 ${themeClass(
            "bg-white",
            "bg-gray-800"
          )}`}
        >
          {/* Header */}
          <div
            className={`flex items-center justify-between px-5 py-6 ${themeClass(
              "bg-gradient-to-r from-orange-500 to-orange-600",
              "bg-gradient-to-r from-orange-600 to-orange-700"
            )}`}
          >
            <div className="flex-1 flex flex-col items-center">
              <img src={assets.HMS} alt="Logo" className="w-20 h-20" />
              <h1 className="font-bold text-2xl text-white mt-2 drop-shadow-md">
                Reset Password
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
              <div className="mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 text-sm rounded">
                {error}
              </div>
            )}

            {/* Success Message */}
            {message && (
              <div className="mb-4 p-3 bg-green-100 border-l-4 border-green-500 text-green-700 text-sm rounded">
                {message}
              </div>
            )}

            {/* Step 1: Email */}
            {step === "email" && (
              <>
                <p
                  className={`text-sm mb-5 ${themeClass(
                    "text-gray-600",
                    "text-gray-400"
                  )}`}
                >
                  Enter your email address and we'll send you an OTP to reset
                  your password.
                </p>
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
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  placeholder="your@email.com"
                  className={`border-2 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:outline-none focus:border-orange-500 focus:ring-2 transition-all duration-300 ${themeClass(
                    "border-gray-300 bg-white text-gray-900 focus:ring-orange-200",
                    "border-gray-600 bg-gray-700 text-gray-100 focus:ring-orange-800"
                  )}`}
                />

                <button
                  onClick={handleSendOTP}
                  type="button"
                  className="transition duration-200 bg-orange-500 hover:bg-orange-600 focus:bg-orange-700 focus:shadow-sm focus:ring-4 focus:ring-orange-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-md hover:shadow-lg font-semibold text-center inline-flex items-center justify-center gap-2"
                >
                  <span>Send OTP</span>
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
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </button>
              </>
            )}

            {/* Step 2: OTP Verification */}
            {step === "otp" && (
              <>
                <p
                  className={`text-sm mb-5 ${themeClass(
                    "text-gray-600",
                    "text-gray-400"
                  )}`}
                >
                  We've sent a 6-digit OTP to{" "}
                  <span className="font-semibold">{email}</span>
                </p>
                <label
                  className={`font-semibold text-sm pb-1 block ${themeClass(
                    "text-gray-600",
                    "text-gray-400"
                  )}`}
                >
                  Enter OTP
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value.replace(/\D/g, "").slice(0, 6));
                    setError("");
                  }}
                  placeholder="000000"
                  maxLength="6"
                  className={`border-2 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full text-center tracking-widest focus:outline-none focus:border-orange-500 focus:ring-2 transition-all duration-300 ${themeClass(
                    "border-gray-300 bg-white text-gray-900 focus:ring-orange-200",
                    "border-gray-600 bg-gray-700 text-gray-100 focus:ring-orange-800"
                  )}`}
                />

                <button
                  onClick={handleVerifyOTP}
                  type="button"
                  className="transition duration-200 bg-orange-500 hover:bg-orange-600 focus:bg-orange-700 focus:shadow-sm focus:ring-4 focus:ring-orange-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-md hover:shadow-lg font-semibold text-center inline-flex items-center justify-center gap-2"
                >
                  <span>Verify OTP</span>
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
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>

                <button
                  onClick={() => setStep("email")}
                  className="transition duration-200 w-full mt-3 text-orange-500 hover:text-orange-600 text-sm font-medium"
                >
                  Didn't receive OTP? Change email
                </button>
              </>
            )}

            {/* Step 3: New Password */}
            {step === "newPassword" && (
              <>
                <p
                  className={`text-sm mb-5 ${themeClass(
                    "text-gray-600",
                    "text-gray-400"
                  )}`}
                >
                  Create a new password for your account.
                </p>
                <label
                  className={`font-semibold text-sm pb-1 block ${themeClass(
                    "text-gray-600",
                    "text-gray-400"
                  )}`}
                >
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="At least 6 characters"
                  className={`border-2 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:outline-none focus:border-orange-500 focus:ring-2 transition-all duration-300 ${themeClass(
                    "border-gray-300 bg-white text-gray-900 focus:ring-orange-200",
                    "border-gray-600 bg-gray-700 text-gray-100 focus:ring-orange-800"
                  )}`}
                />

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
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="Confirm your new password"
                  className={`border-2 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:outline-none focus:border-orange-500 focus:ring-2 transition-all duration-300 ${themeClass(
                    "border-gray-300 bg-white text-gray-900 focus:ring-orange-200",
                    "border-gray-600 bg-gray-700 text-gray-100 focus:ring-orange-800"
                  )}`}
                />

                <button
                  onClick={handleResetPassword}
                  type="button"
                  className="transition duration-200 bg-orange-500 hover:bg-orange-600 focus:bg-orange-700 focus:shadow-sm focus:ring-4 focus:ring-orange-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-md hover:shadow-lg font-semibold text-center inline-flex items-center justify-center gap-2"
                >
                  <span>Reset Password</span>
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
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </button>
              </>
            )}
          </div>

          {/* Footer */}
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
                Remember your password?{" "}
                <button
                  onClick={() => {
                    onClose();
                    onSwitchToLogin();
                  }}
                  className="text-orange-500 font-semibold hover:text-orange-600 transition-colors duration-200"
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

export default ForgotPassword;
