import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";

const Doctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedSpeciality, setSelectedSpeciality] = useState("");

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
    setFilteredDoctors(doctors);
    setSelectedSpeciality("");
  }, [doctors]);

  const handleSpecialityClick = (spec) => {
    filterDoctorsBySpecialty(spec);
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

      {/* Doctor Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doc, index) => (
            <div
              key={doc._id || index}
              className="flex flex-col items-center text-center cursor-pointer gap-3 bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100"
              onClick={() => navigate(`/appointment/${doc._id}`)}
            >
              <div className="relative">
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="w-32 h-32 object-cover rounded-full border-4 border-blue-100"
                />
                <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="mt-2">
                <h2 className="font-bold text-xl text-gray-800">{doc.name}</h2>
                <p className="text-blue-600 text-sm font-medium mt-1">{doc.speciality}</p>
                {doc.degree && <p className="text-gray-500 text-xs mt-1">{doc.degree}</p>}
                {doc.experience && <p className="text-gray-500 text-xs">{doc.experience}</p>}
              </div>
              <button
                className="mt-auto w-full bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/appointment/${doc._id}`);
                }}
              >
                Book Appointment
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-20">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <p className="text-gray-600 text-xl font-medium">No doctors found</p>
            <p className="text-gray-500 mt-2">Try selecting a different speciality</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Doctors;
