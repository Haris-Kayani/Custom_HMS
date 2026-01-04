import { useContext, useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppContext from "../context/AppContext";

const Doctors = () => {
  const navigate = useNavigate();
  const { speciality: urlSpeciality } = useParams();
  const { doctors } = useContext(AppContext);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedSpeciality, setSelectedSpeciality] = useState("");
  const scrollRef = useRef(null);

  const specialities = [...new Set(doctors.map(doc => doc.speciality))].sort();

  const filterDoctorsBySpecialty = (speciality) => {
    if (!speciality || speciality === "all") {
      setFilteredDoctors(doctors);
      setSelectedSpeciality("");
      return;
    }
    const filtered = doctors.filter(
      (doc) => doc.speciality.toLowerCase() === speciality.toLowerCase()
    );
    setFilteredDoctors(filtered);
    setSelectedSpeciality(speciality);
  };

  useEffect(() => {
    if (urlSpeciality) {
      filterDoctorsBySpecialty(urlSpeciality);
    } else {
      setFilteredDoctors(doctors);
      setSelectedSpeciality("");
    }
  }, [doctors, urlSpeciality]);

  const handleSpecialityClick = (spec) => {
    if (spec === "all") {
      navigate("/doctors");
    } else {
      navigate(`/doctors/${spec}`);
    }
  };

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Find Doctors by Speciality</h1>
        <p className="text-gray-600">Browse through our specialist doctors and book an appointment</p>
      </div>

      {/* Speciality Filter Cards */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {/* All Doctors Button */}
        <button
          onClick={() => handleSpecialityClick("all")}
          className={`px-6 py-3 rounded-full font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 ${
            !selectedSpeciality
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-400"
          }`}
        >
          All Doctors
        </button>
        
        {/* Speciality Filter Buttons */}
        {specialities.map((spec) => (
          <button
            key={spec}
            onClick={() => handleSpecialityClick(spec)}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 ${
              selectedSpeciality.toLowerCase() === spec.toLowerCase()
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-400"
            }`}
          >
            {spec}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <div className="text-center mb-6">
        <p className="text-gray-600 text-lg">
          {filteredDoctors.length > 0 ? (
            <>
              Showing <span className="font-semibold text-blue-600">{filteredDoctors.length}</span> {filteredDoctors.length === 1 ? 'doctor' : 'doctors'}
              {selectedSpeciality && <> in <span className="font-semibold text-blue-600">{selectedSpeciality}</span></>}
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
                className="flex flex-col items-center text-center cursor-pointer gap-2 flex-shrink-0 hover:translate-y-[-10px] transition-transform duration-300 bg-white p-6 rounded-lg shadow-lg w-60"
                onClick={() => navigate(`/appointment/${doc._id}`)}
              >
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="w-32 h-32 object-cover rounded-full mb-4 border-4 border-blue-100"
                />
                <h2 className="font-semibold text-xl">{doc.name}</h2>
                <p className="text-gray-500 text-sm">{doc.speciality}</p>
                {doc.degree && <p className="text-gray-400 text-xs">{doc.degree}</p>}
                {doc.experience && <p className="text-gray-400 text-xs">{doc.experience}</p>}
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
          <div className="text-gray-400 text-6xl mb-4">🔍</div>
          <p className="text-gray-600 text-xl font-medium">No doctors found</p>
          <p className="text-gray-500 mt-2">Try selecting a different speciality</p>
        </div>
      )}
    </div>
  );
};

export default Doctors;
