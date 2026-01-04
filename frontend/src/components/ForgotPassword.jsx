import { useState } from "react";
import AuthLogo from "./AuthLogo";

const ForgotPassword = ({ isOpen, onClose, onSwitchToLogin }) => {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState("email"); // "email", "otp", "newPassword"
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSendOTP = () => {
    if (!email) {
      setError("Please enter your email address");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    // Simulate sending OTP
    setMessage("OTP sent to your email address");
    setError("");
    setStep("otp");
  };

  const handleVerifyOTP = () => {
    if (!otp) {
      setError("Please enter the OTP");
      return;
    }

    if (otp.length !== 6) {
      setError("OTP must be 6 digits");
      return;
    }

    setMessage("OTP verified successfully");
    setError("");
    setStep("newPassword");
  };

  const handleResetPassword = () => {
    if (!newPassword || !confirmPassword) {
      setError("Please enter both passwords");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    // Simulate password reset
    setMessage("Password reset successfully. Please login with your new password.");
    setError("");
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
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white shadow-2xl w-full md:w-full md:max-w-md rounded-lg overflow-hidden animate-fadeInScale">
          {/* Header */}
          <div className="flex items-center justify-between bg-gradient-to-r from-orange-500 to-orange-600 px-5 py-6">
            <div className="flex-1 flex flex-col items-center">
              <AuthLogo variant="hospital" size="w-20 h-20" iconSize="w-8 h-8" />
              <h1 className="font-bold text-2xl text-white mt-2 drop-shadow-md">
                Reset Password
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
                <p className="text-gray-600 text-sm mb-5">
                  Enter your email address and we'll send you an OTP to reset your password.
                </p>
                <label className="font-semibold text-sm text-gray-600 pb-1 block">
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
                  className="border-2 border-gray-300 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300"
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
                <p className="text-gray-600 text-sm mb-5">
                  We've sent a 6-digit OTP to <span className="font-semibold">{email}</span>
                </p>
                <label className="font-semibold text-sm text-gray-600 pb-1 block">
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
                  className="border-2 border-gray-300 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full text-center tracking-widest focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300"
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
                <p className="text-gray-600 text-sm mb-5">
                  Create a new password for your account.
                </p>
                <label className="font-semibold text-sm text-gray-600 pb-1 block">
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
                  className="border-2 border-gray-300 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300"
                />

                <label className="font-semibold text-sm text-gray-600 pb-1 block">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="Re-enter your password"
                  className="border-2 border-gray-300 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300"
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
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 py-5 bg-gray-50">
            <div className="text-center whitespace-nowrap">
              <p className="text-gray-600 text-sm mb-3">
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

export default ForgotPassword;
