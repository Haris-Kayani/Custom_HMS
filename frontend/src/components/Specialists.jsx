import React from "react";
import { specialityData } from "../assets/assets";
import { Link } from "react-router-dom";

export const SpecialistsMenu = () => {
  return (
    <div
      className="flex flex-col items-center gap-4 py-16 text-gray-800"
      id="specialists"
    >
      <div className="text-center">
        <h2 className="text-3xl font-medium text-slate-800">
          Find a Doctor by Speciality
        </h2>
        <p className="sm:w-full max-w-md mx-auto mt-2 text-center text-sm text-slate-600">
          Find your trusted medical experts here. Schedule your appointment with
          ease.
        </p>
      </div>

      {/* Responsive grid for specialist cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 pt-8 w-full max-w-6xl px-4">
        {specialityData.map((item) => (
          <Link
            to={`/doctors/${item.speciality}`}
            key={item.speciality}
            className="group relative flex flex-col items-center justify-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4 text-center shadow-sm outline-none ring-blue-500 ring-offset-2 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 hover:shadow-lg focus-visible:ring-2 active:scale-95"
          >
            {/* Icon container */}
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-inner-sm transition-transform duration-300 ease-in-out group-hover:-translate-y-1">
              <img
                className="h-11 w-11 object-contain"
                src={item.image}
                alt="" // Alt text is decorative as the label provides context
              />
            </div>
            {/* Label */}
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-700">
              {item.speciality}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};
