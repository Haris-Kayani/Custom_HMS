import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="w-full bg-gradient-to-b from-white to-gray-50">
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
                  src="/NPH.png"
                  alt="National Police Hospital"
                  className="h-10 w-auto object-contain"
                  loading="lazy"
                />
                <span className="hidden sm:inline text-sm font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                  National Police Hospital
                </span>
              </Link>
            </div>

            {/* Center: Copyright */}
            <div className="text-center">
              <p className="text-xs text-gray-500 tracking-wide">
                © {new Date().getFullYear()} National Police Hospital
              </p>
              <p className="text-xs text-gray-400 mt-1">
                All Rights Reserved
              </p>
            </div>

            {/* Right: Navigation Links */}
            <div className="flex items-center justify-center md:justify-end gap-6">
              <a
                href="#"
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200 relative group"
                aria-label="Privacy Policy"
              >
                Privacy
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
              </a>
              <span className="text-gray-300">•</span>
              <a
                href="#"
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200 relative group"
                aria-label="Terms of Service"
              >
                Terms
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
              </a>
              <span className="text-gray-300">•</span>
              <a
                href="#"
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200 relative group"
                aria-label="Contact Us"
              >
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

