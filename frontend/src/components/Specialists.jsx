import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import API from "../services/api";
import { specialityData } from "../assets/assets";

export const SpecialistsMenu = () => {
  const { t, theme } = useLanguage();
  const [specialists, setSpecialists] = useState([]);

  useEffect(() => {
    const fetchSpecialists = async () => {
      try {
        const { data } = await API.get("/specialists");
        setSpecialists(data.data);
      } catch (error) {
        console.error("Failed to fetch specialists", error);
      }
    };
    fetchSpecialists();
  }, []);

  const isDark = theme === "dark";
  const themeClass = (light, dark) => (isDark ? dark : light);

  const getSpecialityImage = (name) => {
    const speciality = specialityData.find(
      (s) => s.speciality.toLowerCase() === name.toLowerCase()
    );
    return speciality ? speciality.image : "https://via.placeholder.com/150";
  };

  return (
    <div
      className={`flex flex-col items-center gap-4 py-16 transition-colors duration-300 ${themeClass(
        "text-gray-800",
        "text-gray-200"
      )}`}
      id="specialists"
    >
      <div className="text-center">
        <h2
          className={`text-3xl font-medium ${themeClass(
            "text-slate-800",
            "text-gray-100"
          )}`}
        >
          {t("home.specialists.title")}
        </h2>
        <p
          className={`sm:w-full max-w-md mx-auto mt-2 text-center text-sm ${themeClass(
            "text-slate-600",
            "text-gray-400"
          )}`}
        >
          Find your trusted medical experts here. Schedule your appointment with
          ease.
        </p>
      </div>

      {/* Responsive grid for specialist cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 pt-8 w-full max-w-6xl px-4">
        {specialists.map((item) => (
          <Link
            to={`/doctors?speciality=${item.name}`}
            key={item._id}
            className={`group relative flex flex-col items-center justify-center gap-3 rounded-xl border p-4 text-center shadow-sm outline-none ring-blue-500 ring-offset-2 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 hover:shadow-lg focus-visible:ring-2 active:scale-95 ${themeClass(
              "border-gray-200 bg-white",
              "border-gray-700 bg-gray-800"
            )}`}
          >
            {/* Icon container */}
            <div
              className={`flex h-20 w-20 items-center justify-center rounded-full shadow-inner-sm transition-transform duration-300 ease-in-out group-hover:-translate-y-1 ${themeClass(
                "bg-gray-50",
                "bg-gray-700"
              )}`}
            >
              <img
                className="h-11 w-11 object-contain"
                src={getSpecialityImage(item.name)}
                alt={item.name}
              />
            </div>
            {/* Label */}
            <p
              className={`text-xs font-semibold uppercase tracking-wider ${themeClass(
                "text-gray-700",
                "text-gray-300"
              )}`}
            >
              {item.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};
