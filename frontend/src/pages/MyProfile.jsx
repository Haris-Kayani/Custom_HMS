import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, ChevronRight } from "lucide-react";
import userIcon from "../assets/user.png";
import settingsIcon from "../assets/cogwheel-hand-drawn-tool.png";
import sunIcon from "../assets/sun.png";
import moonIcon from "../assets/moon.png";
import { useLanguage } from "../context/LanguageContext";

const MyProfile = () => {
  const navigate = useNavigate();
  const { theme, language, setThemeMode, setLanguageMode, t } = useLanguage();
  const [activeSection, setActiveSection] = useState("profile");

  const isDark = theme === "dark";
  const themeClass = (light, dark) => (isDark ? dark : light);

  const [profileData, setProfileData] = useState({
    name: "Your name",
    email: "yourname@gmail.com",
    mobile: "",
    profileImage: new URL("../assets/user.png", import.meta.url).href,
  });

  const handleInputChange = (field, value) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveChange = () => {
    console.log("Profile updated:", profileData);
  };

  const handleLogout = () => {
    console.log("Logging out...");
    navigate("/");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData((prev) => ({ ...prev, profileImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="py-8">
      <div className="flex flex-col lg:flex-row gap-6 px-4">
        {/* Left Panel - User Menu */}
        <div
          className={`border rounded-xl shadow-sm p-6 lg:w-80 flex-shrink-0 relative transition-colors duration-300 ${themeClass(
            "bg-white border-gray-200",
            "bg-gray-800 border-gray-700"
          )}`}
        >
          {/* Profile Header */}
          <div
            className={`flex items-center gap-4 mb-6 pb-6 border-b ${themeClass(
              "border-gray-200",
              "border-gray-700"
            )}`}
          >
            <img
              src={profileData.profileImage}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
            />
            <div className="flex-1">
              <h3
                className={`font-semibold text-lg ${themeClass(
                  "text-gray-800",
                  "text-white"
                )}`}
              >
                {profileData.name}
              </h3>
              <p className={themeClass("text-gray-500", "text-gray-400")}>
                {profileData.email}
              </p>
            </div>
          </div>

          {/* Menu Items */}
          <div className="space-y-2">
            <button
              onClick={() => setActiveSection("profile")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors group ${
                activeSection === "profile"
                  ? themeClass("bg-blue-50", "bg-blue-900/50")
                  : themeClass("hover:bg-gray-100", "hover:bg-gray-700")
              }`}
            >
              <div className="flex items-center gap-3">
                <img
                  src={userIcon}
                  alt="Profile"
                  className={`w-5 h-5 ${themeClass("", "invert brightness-90")}`}
                />
                <span
                  className={`font-medium ${themeClass(
                    "text-gray-700",
                    "text-gray-200"
                  )}`}
                >
                  {t("myProfile.menu.profile")}
                </span>
              </div>
              <ChevronRight
                className={`w-5 h-5 transition-colors ${themeClass(
                  "text-gray-400 group-hover:text-gray-600",
                  "text-gray-500 group-hover:text-gray-300"
                )}`}
              />
            </button>

            <button
              onClick={() => setActiveSection("settings")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors group ${
                activeSection === "settings"
                  ? themeClass("bg-blue-50", "bg-blue-900/50")
                  : themeClass("hover:bg-gray-100", "hover:bg-gray-700")
              }`}
            >
              <div className="flex items-center gap-3">
                <img
                  src={settingsIcon}
                  alt="Settings"
                  className={`w-5 h-5 ${themeClass("", "invert brightness-90")}`}
                />
                <span
                  className={`font-medium ${themeClass(
                    "text-gray-700",
                    "text-gray-200"
                  )}`}
                >
                  {t("myProfile.menu.settings")}
                </span>
              </div>
              <ChevronRight
                className={`w-5 h-5 transition-colors ${themeClass(
                  "text-gray-400 group-hover:text-gray-600",
                  "text-gray-500 group-hover:text-gray-300"
                )}`}
              />
            </button>

            <button
              onClick={handleLogout}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors group ${themeClass(
                "hover:bg-gray-100",
                "hover:bg-gray-700"
              )}`}
            >
              <div className="flex items-center gap-3">
                <LogOut
                  className={`w-5 h-5 ${themeClass(
                    "text-gray-600",
                    "text-gray-400"
                  )}`}
                />
                <span
                  className={`font-medium ${themeClass(
                    "text-gray-700",
                    "text-gray-200"
                  )}`}
                >
                  {t("myProfile.menu.logout")}
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Right Panel - Profile Edit Form or Settings */}
        <div
          className={`border rounded-xl shadow-sm p-8 flex-1 transition-colors duration-300 ${themeClass(
            "bg-white border-gray-200",
            "bg-gray-800 border-gray-700"
          )}`}
        >
          {activeSection === "profile" ? (
            <>
              {/* Profile Picture Section */}
              <div
                className={`flex items-center gap-6 mb-8 pb-8 border-b ${themeClass(
                  "border-gray-200",
                  "border-gray-700"
                )}`}
              >
                <div className="relative group">
                  <img
                    src={profileData.profileImage}
                    alt="Profile"
                    className={`w-24 h-24 rounded-full object-cover border-4 shadow-md ${themeClass(
                      "border-gray-200",
                      "border-gray-700"
                    )}`}
                  />
                  <label className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600 transition-colors shadow-lg group-hover:scale-110 transform transition-transform">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                <div>
                  <h2
                    className={`text-2xl font-semibold ${themeClass(
                      "text-gray-800",
                      "text-white"
                    )}`}
                  >
                    {profileData.name}
                  </h2>
                  <p className={themeClass("text-gray-500", "text-gray-400")}>
                    {profileData.email}
                  </p>
                </div>
              </div>

              {/* Profile Form Fields */}
              <div className="space-y-6">
                {/* Name Field */}
                <div
                  className={`flex items-center justify-between py-4 border-b ${themeClass(
                    "border-gray-200",
                    "border-gray-700"
                  )}`}
                >
                  <label
                    className={`font-medium w-40 ${themeClass(
                      "text-gray-600",
                      "text-gray-400"
                    )}`}
                  >
                    {t("myProfile.profile.fullName")}
                  </label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className={`flex-1 text-right bg-transparent border-none outline-none transition-colors ${themeClass(
                      "text-gray-800 focus:text-blue-600",
                      "text-gray-200 focus:text-blue-400"
                    )}`}
                    placeholder="your name"
                  />
                </div>

                {/* Email Field */}
                <div
                  className={`flex items-center justify-between py-4 border-b ${themeClass(
                    "border-gray-200",
                    "border-gray-700"
                  )}`}
                >
                  <label
                    className={`font-medium w-40 ${themeClass(
                      "text-gray-600",
                      "text-gray-400"
                    )}`}
                  >
                    {t("myProfile.profile.email")}
                  </label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`flex-1 text-right bg-transparent border-none outline-none transition-colors ${themeClass(
                      "text-gray-800 focus:text-blue-600",
                      "text-gray-200 focus:text-blue-400"
                    )}`}
                    placeholder="yourname@gmail.com"
                  />
                </div>

                {/* Mobile Number Field */}
                <div
                  className={`flex items-center justify-between py-4 border-b ${themeClass(
                    "border-gray-200",
                    "border-gray-700"
                  )}`}
                >
                  <label
                    className={`font-medium w-40 ${themeClass(
                      "text-gray-600",
                      "text-gray-400"
                    )}`}
                  >
                    {t("myProfile.profile.phone")}
                  </label>
                  <input
                    type="tel"
                    value={profileData.mobile}
                    onChange={(e) =>
                      handleInputChange("mobile", e.target.value)
                    }
                    className={`flex-1 text-right bg-transparent border-none outline-none transition-colors ${themeClass(
                      "text-gray-500 focus:text-blue-600",
                      "text-gray-500 focus:text-blue-400"
                    )}`}
                    placeholder="Add number"
                  />
                </div>
              </div>

              {/* Save Button */}
              <div className="mt-8">
                <button
                  onClick={handleSaveChange}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                >
                  {t("myProfile.profile.saveButton")}
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Settings Section */}
              <h2
                className={`text-2xl font-semibold mb-8 ${themeClass(
                  "text-gray-800",
                  "text-white"
                )}`}
              >
                {t("myProfile.settings.title")}
              </h2>

              <div className="space-y-8">
                {/* Theme Setting */}
                <div
                  className={`pb-8 border-b ${themeClass(
                    "border-gray-200",
                    "border-gray-700"
                  )}`}
                >
                  <label
                    className={`font-medium block mb-4 ${themeClass(
                      "text-gray-600",
                      "text-gray-400"
                    )}`}
                  >
                    {t("myProfile.settings.theme")}
                  </label>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setThemeMode("light")}
                      className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                        theme === "light"
                          ? "bg-blue-500 text-white shadow-md"
                          : themeClass(
                              "bg-gray-100 text-gray-700 hover:bg-gray-200",
                              "bg-gray-700 text-gray-300 hover:bg-gray-600"
                            )
                      }`}
                    >
                      <img src={sunIcon} alt="Light" className="w-5 h-5" />
                      <span>{t("myProfile.settings.light")}</span>
                    </button>
                    <button
                      onClick={() => setThemeMode("dark")}
                      className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                        theme === "dark"
                          ? "bg-blue-500 text-white shadow-md"
                          : themeClass(
                              "bg-gray-100 text-gray-700 hover:bg-gray-200",
                              "bg-gray-700 text-gray-300 hover:bg-gray-600"
                            )
                      }`}
                    >
                      <img src={moonIcon} alt="Dark" className="w-5 h-5" />
                      <span>{t("myProfile.settings.dark")}</span>
                    </button>
                  </div>
                </div>

                {/* Language Setting */}
                <div>
                  <label
                    className={`font-medium block mb-4 ${themeClass(
                      "text-gray-600",
                      "text-gray-400"
                    )}`}
                  >
                    {t("myProfile.settings.language")}
                  </label>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setLanguageMode("Eng")}
                      className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                        language === "Eng"
                          ? "bg-blue-500 text-white shadow-md"
                          : themeClass(
                              "bg-gray-100 text-gray-700 hover:bg-gray-200",
                              "bg-gray-700 text-gray-300 hover:bg-gray-600"
                            )
                      }`}
                    >
                      {t("myProfile.settings.english")}
                    </button>
                    <button
                      onClick={() => setLanguageMode("Urdu")}
                      className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                        language === "Urdu"
                          ? "bg-blue-500 text-white shadow-md"
                          : themeClass(
                              "bg-gray-100 text-gray-700 hover:bg-gray-200",
                              "bg-gray-700 text-gray-300 hover:bg-gray-600"
                            )
                      }`}
                    >
                      {t("myProfile.settings.urdu")}
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
