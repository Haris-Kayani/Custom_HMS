import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const HeaderBanner = () => {
  return (
    <div className="relative overflow-hidden bg-blue-500 rounded-lg px-6 md:px-10 lg:px-20 py-10 md:py-16">
      <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-10">
        {/* Left */}
        <div className="flex-1 flex flex-col gap-6 max-w-xl">
          <h1 className="text-black text-3xl md:text-5xl font-semibold leading-tight">
            Book Appointment
            <br />
            With Trusted Doctors
          </h1>

          <div className="flex items-center gap-4">
            <img
              src={assets.group_profiles}
              alt="Group Profiles"
              className="w-24 md:w-28 h-auto"
            />
            <p className="text-black text-sm md:text-base leading-relaxed">
              Simply browse through our extensive list of trusted doctors,
              schedule your appointment hassle-free.
            </p>
          </div>

          <button
            onClick={() =>
              document.getElementById("specialists")?.scrollIntoView({
                behavior: "smooth",
              })
            }
            className="w-fit inline-flex items-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-100 transform transition-transform duration-300 hover:translate-x-[10px]"
          >
            Book appointment
            <img src={assets.arrow_icon} alt="Arrow Icon" className="w-4 h-4" />
          </button>
        </div>

        {/* Right */}
        <div className="flex-1 flex justify-center md:justify-end items-end">
          <Link to="/docters">
            <img
              src={assets.header_img}
              alt="Header Banner"
              className="w-full max-w-md md:max-w-lg h-auto cursor-pointer transform transition-transform duration-300 hover:-translate-y-2"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeaderBanner;
