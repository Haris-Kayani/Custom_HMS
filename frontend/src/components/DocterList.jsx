import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import API from "../services/api";

export const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const { t, theme } = useLanguage();
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await API.get("/doctors");
        setDoctors(data.data);
      } catch (error) {
        console.error("Failed to fetch doctors", error);
      }
    };
    fetchDoctors();
  }, []);

  const isDark = theme === "dark";
  const themeClass = (light, dark) => (isDark ? dark : light);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div
      className={`flex flex-col items-center gap-4 py-16 transition-colors duration-300 ${themeClass(
        "text-gray-800",
        "text-gray-200"
      )}`}
    >
      <h1 className={`text-3xl font-medium ${themeClass("", "text-gray-100")}`}>
        {t("home.topDoctors.title")}
      </h1>
      <p className={`sm:w-1/3 text-center text-sm ${themeClass("", "text-gray-400")}`}>
        Book your appointment with our specialist doctors
      </p>

      <div className="flex flex-col items-center gap-8 pt-5 w-full">
        <div
          ref={scrollRef}
          className="flex justify-center gap-8 w-full overflow-x-auto p-4"
        >
          {doctors.map((doc, index) => (
            <div
              key={index}
              className={`flex flex-col items-center text-center cursor-pointer gap-2 flex-shrink-0 hover:translate-y-[-10px] transition-transform duration-300 p-6 rounded-lg shadow-lg w-60 border ${themeClass(
                "bg-white border-gray-200",
                "bg-gray-800 border-gray-700"
              )}`}
            >
              <img
                src={doc.image || "https://via.placeholder.com/150"}
                alt={`${doc.firstName} ${doc.lastName}`}
                className={`w-32 h-32 object-cover rounded-full mb-4 border-4 ${themeClass(
                  "border-blue-100",
                  "border-blue-900"
                )}`}
              />
              <h2 className={`font-semibold text-xl ${themeClass("", "text-white")}`}>
                Dr. {doc.firstName} {doc.lastName}
              </h2>
              <p className={`text-gray-500 ${themeClass("", "text-gray-400")} text-sm`}>
                {doc.speciality}
              </p>
              <div className="flex items-center gap-1 text-green-500">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-sm">
                  {t("home.topDoctors.available")}
                </span>
              </div>
              <Link
                to={`/appointment/${doc._id}`}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-600 transition-colors duration-300"
              >
                Book Now
              </Link>
            </div>
          ))}
        </div>
        <div className="flex gap-6 mt-6">
          <button
            onClick={scrollLeft}
            className="bg-blue-500 text-white rounded-full w-14 h-14 flex items-center justify-center hover:bg-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            aria-label="Scroll left"
          >
            ←
          </button>
          <button
            onClick={scrollRight}
            className="bg-blue-500 text-white rounded-full w-14 h-14 flex items-center justify-center hover:bg-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            aria-label="Scroll right"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorList;
