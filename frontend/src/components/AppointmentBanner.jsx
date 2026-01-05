import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { useLanguage } from "../context/LanguageContext";

export const AppointmentBanner = () => {
  const { t, theme } = useLanguage();

  const isDark = theme === "dark";
  const themeClass = (light, dark) => (isDark ? dark : light);

  return (
    <div
      className={`relative overflow-hidden rounded-lg px-8 md:px-12 py-8 md:py-12 transition-colors duration-300 ${themeClass(
        "bg-blue-500",
        "bg-blue-600"
      )}`}
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left */}
        <div className="flex-1 flex flex-col gap-4 max-w-2xl">
          <h2
            className={`text-2xl md:text-4xl font-semibold leading-tight ${themeClass(
              "text-black",
              "text-white"
            )}`}
          >
            {t("home.banner.title")}
          </h2>

          <p
            className={`text-sm md:text-base leading-relaxed max-w-prose ${themeClass(
              "text-black",
              "text-gray-100"
            )}`}
          >
            Schedule your appointment with our qualified healthcare
            professionals. Get expert medical care at your convenience.
          </p>

          <Link
            to="/doctors"
            className={`w-fit inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transform transition-all duration-300 hover:translate-x-[10px] ${themeClass(
              "bg-white text-gray-700 hover:bg-gray-100",
              "bg-gray-800 text-gray-200 hover:bg-gray-700"
            )}`}
          >
            {t("home.banner.button")}
            <img
              src={assets.arrow_icon}
              alt="Arrow Icon"
              className={`w-4 h-4 ${themeClass("", "invert")}`}
            />
          </Link>
        </div>

        {/* Right */}
        <div className="flex-shrink-0 w-44 md:w-64 lg:w-72 flex justify-end items-end">
          <img
            src={assets.appointment_img}
            alt="Doctor"
            className="w-full h-auto rounded-md object-contain"
          />
        </div>
      </div>
    </div>
  );
};
