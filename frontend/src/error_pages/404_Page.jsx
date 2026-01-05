import image from "./image.svg";
import { useLanguage } from "../context/LanguageContext";

export default function NotFoundImage() {
  const { theme } = useLanguage();
  const isDark = theme === "dark";
  const themeClass = (light, dark) => (isDark ? dark : light);

  return (
    <div className="px-4 py-20 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-20 items-center">
        {/* Mobile Image */}
        <img
          src={image}
          alt="404 illustration"
          className="block sm:hidden w-full"
        />

        {/* Text Content */}
        <div>
          <h1
            className={`font-medium text-[32px] sm:text-[34px] mb-4 font-[Outfit] ${themeClass(
              "text-gray-800",
              "text-white"
            )}`}
          >
            Something is not right...
          </h1>

          <p className={themeClass("text-gray-500", "text-gray-400 text-lg")}>
            Page you are trying to open does not exist. You may have mistyped the
            address, or the page has been moved to another URL. If you think
            this is an error contact support.
          </p>

          <button
            className={`mt-6 sm:mt-8 w-full sm:w-auto px-6 py-3 border rounded-md text-sm font-medium transition ${themeClass(
              "border-gray-300 text-gray-700 hover:bg-gray-100",
              "border-gray-600 text-gray-300 hover:bg-gray-700"
            )}`}
          >
            Get back to home page
          </button>
        </div>

        {/* Desktop Image */}
        <img
          src={image}
          alt="404 illustration"
          className="hidden sm:block w-full"
        />
      </div>
    </div>
  );
}