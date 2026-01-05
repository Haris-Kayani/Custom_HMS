import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

export function Footer() {
  const { t, theme } = useLanguage();

  const isDark = theme === "dark";
  const themeClass = (light, dark) => (isDark ? dark : light);

  return (
    <footer
      className={`w-full transition-colors duration-300 ${themeClass(
        "bg-gradient-to-b from-white to-gray-50",
        "bg-gradient-to-b from-gray-900 to-gray-800"
      )}`}
    >
      <div className="w-full px-4 py-10 lg:py-12">
        <div className="max-w-7xl mx-auto">
          {/* Three-Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 items-center">
            {/* Left: Logo & Hospital Name */}
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <Link
                to="/"
                className="flex items-center gap-2 group hover:opacity-80 transition-opacity duration-200"
                aria-label="National Police Hospital Home"
              >
                <img
                  src={isDark ? "/NPH-white.png" : "/NPH.png"}
                  alt="National Police Hospital"
                  className="h-10 w-auto object-contain"
                  loading="lazy"
                />
                <span
                  className={`hidden sm:inline text-sm font-medium transition-colors ${themeClass(
                    "text-gray-800 group-hover:text-blue-600",
                    "text-gray-200 group-hover:text-blue-400"
                  )}`}
                >
                  {t("footer.hospitalName")}
                </span>
              </Link>
            </div>

            {/* Center: Copyright */}
            <div className="text-center">
              <p
                className={`text-xs tracking-wide ${themeClass(
                  "text-gray-500",
                  "text-gray-400"
                )}`}
              >
                {t("footer.copyright")}
              </p>
              <p
                className={`text-xs mt-1 ${themeClass(
                  "text-gray-400",
                  "text-gray-500"
                )}`}
              >
                {t("footer.allRights")}
              </p>
            </div>

            {/* Right: Navigation Links */}
            <div className="flex items-center justify-center md:justify-end gap-6">
              <a
                href="#"
                className={`text-sm transition-colors duration-200 relative group ${themeClass(
                  "text-gray-600 hover:text-blue-600",
                  "text-gray-400 hover:text-blue-400"
                )}`}
                aria-label="Privacy Policy"
              >
                {t("footer.privacy")}
                <span
                  className={`absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 ${themeClass(
                    "bg-blue-600",
                    "bg-blue-400"
                  )}`}
                ></span>
              </a>
              <span
                className={themeClass("text-gray-300", "text-gray-600")}
              >
                •
              </span>
              <a
                href="#"
                className={`text-sm transition-colors duration-200 relative group ${themeClass(
                  "text-gray-600 hover:text-blue-600",
                  "text-gray-400 hover:text-blue-400"
                )}`}
                aria-label="Terms of Service"
              >
                {t("footer.terms")}
                <span
                  className={`absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 ${themeClass(
                    "bg-blue-600",
                    "bg-blue-400"
                  )}`}
                ></span>
              </a>
              <span
                className={themeClass("text-gray-300", "text-gray-600")}
              >
                •
              </span>
              <a
                href="#"
                className={`text-sm transition-colors duration-200 relative group ${themeClass(
                  "text-gray-600 hover:text-blue-600",
                  "text-gray-400 hover:text-blue-400"
                )}`}
                aria-label="Contact Us"
              >
                {t("footer.contact")}
                <span
                  className={`absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 ${themeClass(
                    "bg-blue-600",
                    "bg-blue-400"
                  )}`}
                ></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
