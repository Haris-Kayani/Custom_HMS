import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

export const AppointmentBanner = () => {
  return (
    <div className="relative overflow-hidden bg-blue-500 rounded-lg px-8 md:px-12 py-8 md:py-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left */}
        <div className="flex-1 flex flex-col gap-4 max-w-2xl">
          <h2 className="text-black text-2xl md:text-4xl font-semibold leading-tight">
            Book Appointment
            <br />
            With 100+ Trusted Doctors
          </h2>

          <p className="text-black text-sm md:text-base leading-relaxed max-w-prose">
            Schedule your appointment with our qualified healthcare professionals. Get expert medical care at your convenience.
          </p>

          <Link
            to="/doctors"
            className="w-fit inline-flex items-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-100 transform transition-transform duration-300 hover:translate-x-[10px]"
          >
            Sign Up
            <img src={assets.arrow_icon} alt="Arrow Icon" className="w-4 h-4" />
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