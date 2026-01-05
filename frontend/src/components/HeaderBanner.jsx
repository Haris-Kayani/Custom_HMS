import { Link } from "react-router-dom";
import { useContext } from "react";
import { assets } from "../assets/assets";
import AppContext from "../context/AppContext";
import { useLanguage } from "../context/LanguageContext";

const HeaderBanner = () => {
  const { doctors } = useContext(AppContext);
  const { t, theme } = useLanguage();

  const isDark = theme === "dark";
  const themeClass = (light, dark) => (isDark ? dark : light);

  return (
    <div
      className={`relative overflow-hidden rounded-lg px-6 md:px-10 lg:px-20 py-10 md:py-16 transition-colors duration-300 ${themeClass(
        "bg-blue-500",
        "bg-blue-600"
      )}`}
    >
      <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-10">
        {/* Left */}
        <div className="flex-1 flex flex-col gap-6 max-w-xl">
          <h1
            className={`text-3xl md:text-5xl font-semibold leading-tight ${themeClass(
              "text-black",
              "text-white"
            )}`}
          >
            {t("home.banner.title")}
          </h1>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex -space-x-3 flex-shrink-0">
              {doctors.slice(0, 3).map((doc) => (
                <img
                  key={doc._id}
                  src={doc.image}
                  alt={doc.name}
                  className="w-12 h-12 rounded-full border-2 border-white shadow-md object-cover"
                />
              ))}
            </div>
            <p
              className={`text-sm md:text-base leading-relaxed ${themeClass(
                "text-black",
                "text-gray-100"
              )}`}
            >
              {t("home.banner.subtitle")}
            </p>
          </div>

          <button
            onClick={() =>
              document.getElementById("specialists")?.scrollIntoView({
                behavior: "smooth",
              })
            }
            className={`w-fit inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transform transition-all duration-300 hover:translate-x-[10px] cursor-pointer ${themeClass(
              "bg-white text-blue-600 hover:bg-gray-50",
              "bg-gray-800 text-gray-200 hover:bg-gray-700"
            )}`}
          >
            {t("home.banner.button")}
            <img
              src={assets.arrow_icon}
              alt="Arrow Icon"
              className={`w-4 h-4 ${themeClass("", "invert")}`}
            />
          </button>
        </div>

        {/* Right */}
        <div className="flex-1 flex justify-center md:justify-end items-end">
          <img
            src={assets.header_img}
            alt="Doctors Team"
            className="w-full max-w-xs md:max-w-md rounded-lg shadow-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default HeaderBanner;
