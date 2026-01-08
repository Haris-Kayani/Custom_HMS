import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import API from "../services/api";

const Doctors = () => {
  const navigate = useNavigate();
  const { speciality: urlSpeciality } = useParams();
  const { theme } = useLanguage();
  const [doctors, setDoctors] = useState([]);
  const [specialities, setSpecialities] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedSpeciality, setSelectedSpeciality] = useState("");
  const scrollRef = useRef(null);

  const isDark = theme === "dark";
  const themeClass = (light, dark) => (isDark ? dark : light);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await API.get(`/doctors${urlSpeciality ? `?speciality=${urlSpeciality}` : ''}`);
        setDoctors(data.data);
        setFilteredDoctors(data.data);
      } catch (error) {
        console.error("Failed to fetch doctors", error);
      }
    };

    const fetchSpecialities = async () => {
      try {
        const { data } = await API.get("/specialists");
        setSpecialities(data.data);
      } catch (error) {
        console.error("Failed to fetch specialities", error);
      }
    };

    fetchDoctors();
    fetchSpecialities();
  }, [urlSpeciality]);

  useEffect(() => {
    if (urlSpeciality) {
      setSelectedSpeciality(urlSpeciality);
    } else {
      setSelectedSpeciality("");
    }
  }, [urlSpeciality]);

  const handleSpecialityClick = (spec) => {
    if (spec === "all") {
      navigate("/doctors");
    } else {
      navigate(`/doctors/${spec}`);
    }
  };

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1
          className={`text-3xl font-bold mb-2 ${themeClass(
            "text-gray-800",
            "text-white"
          )}`}
        >
          Find Doctors by Speciality
        </h1>
        <p className={themeClass("text-gray-600", "text-gray-400")}>
          Browse through our specialist doctors and book an appointment
        </p>
      </div>

      {/* Speciality Filter Cards */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {/* All Doctors Button */}
        <button
          onClick={() => handleSpecialityClick("all")}
          className={`px-6 py-3 rounded-full font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 ${
            !selectedSpeciality
              ? "bg-blue-600 text-white"
              : themeClass(
                  "bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-400",
                  "bg-gray-800 text-gray-300 border-2 border-gray-700 hover:border-blue-500"
                )
          }`}
        >
          All Doctors
        </button>

        {/* Speciality Filter Buttons */}
        {specialities.map((spec) => (
          <button
            key={spec._id}
            onClick={() => handleSpecialityClick(spec.name)}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 ${
              selectedSpeciality.toLowerCase() === spec.name.toLowerCase()
                ? "bg-blue-600 text-white"
                : themeClass(
                    "bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-400",
                    "bg-gray-800 text-gray-300 border-2 border-gray-700 hover:border-blue-500"
                  )
            }`}
          >
            {spec.name}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <div className="text-center mb-6">
        <p className={`text-lg ${themeClass("text-gray-600", "text-gray-400")}`}>
          {filteredDoctors.length > 0 ? (
            <>
              Showing{" "}
              <span className="font-semibold text-blue-600">
                {filteredDoctors.length}
              </span>{" "}
              {filteredDoctors.length === 1 ? "doctor" : "doctors"}
              {selectedSpeciality && (
                <>
                  {" "}
                  in{" "}
                  <span className="font-semibold text-blue-600">
                    {selectedSpeciality}
                  </span>
                </>
              )}
            </>
          ) : (
            "No doctors found"
          )}
        </p>
      </div>

      {/* Doctor Cards - Scrollable Layout */}
      {filteredDoctors.length > 0 ? (
        <div className="flex flex-col items-center gap-6">
          <div ref={scrollRef} className="flex gap-8 w-full overflow-x-auto p-4">
            {filteredDoctors.map((doc, index) => (
              <div
                key={doc._id || index}
                className={`flex flex-col items-center text-center cursor-pointer gap-2 flex-shrink-0 hover:translate-y-[-10px] transition-transform duration-300 p-6 rounded-lg shadow-lg border w-60 ${themeClass(
                  "bg-white border-gray-200",
                  "bg-gray-800 border-gray-700"
                )}`}
                onClick={() => navigate(`/appointment/${doc._id}`)}
              >
                <img
                  src={doc.image || "https://via.placeholder.com/150"}
                  alt={`${doc.firstName} ${doc.lastName}`}
                  className={`w-32 h-32 object-cover rounded-full mb-4 border-4 ${themeClass(
                    "border-blue-100",
                    "border-blue-900"
                  )}`}
                />
                <h2
                  className={`font-semibold text-xl ${themeClass(
                    "text-gray-800",
                    "text-white"
                  )}`}
                >
                  Dr. {doc.firstName} {doc.lastName}
                </h2>
                <p
                  className={`text-sm ${themeClass(
                    "text-gray-500",
                    "text-gray-400"
                  )}`}
                >
                  {doc.speciality.name}
                </p>
                {doc.degree && (
                  <p
                    className={`text-xs ${themeClass(
                      "text-gray-400",
                      "text-gray-500"
                    )}`}
                  >
                    {doc.degree}
                  </p>
                )}
                {doc.experience && (
                  <p
                    className={`text-xs ${themeClass(
                      "text-gray-400",
                      "text-gray-500"
                    )}`}
                  >
                    {doc.experience} years
                  </p>
                )}
                <button
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-600 transition-colors duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/appointment/${doc._id}`);
                  }}
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>

          {/* Scroll Buttons */}
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
      ) : (
        <div className="text-center py-20">
          <div className={themeClass("text-gray-400", "text-gray-600") + " text-6xl mb-4"}>🔍</div>
          <p className={`text-xl font-medium ${themeClass("text-gray-600", "text-gray-400")}`}>No doctors found</p>
          <p className={`mt-2 ${themeClass("text-gray-500", "text-gray-500")}`}>Try selecting a different speciality</p>
        </div>
      )}
    </div>
  );
};

export default Doctors;
