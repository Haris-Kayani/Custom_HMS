import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";

const RelatedDoctors = ({ doctorId, speciality }) => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  // Filter doctors by same specialty, excluding current doctor
  const relatedDoctors = doctors
    .filter((doc) => doc.speciality === speciality && doc._id !== doctorId)
    .slice(0, 5); // Show only 5 related doctors

  if (relatedDoctors.length === 0) return null;

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Related Doctors
      </h2>
      <p className="text-gray-600 text-center mb-8">
        Other specialists in {speciality}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {relatedDoctors.map((doc) => (
          <div
            key={doc._id}
            onClick={() => {
              navigate(`/appointment/${doc._id}`);
              window.scrollTo(0, 0);
            }}
            className="flex flex-col items-center text-center cursor-pointer gap-3 bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100"
          >
            <div className="relative">
              <img
                src={doc.image}
                alt={doc.name}
                className="w-24 h-24 object-cover rounded-full border-4 border-blue-100"
              />
              <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-800">{doc.name}</h3>
              <p className="text-blue-600 text-sm font-medium mt-1">
                {doc.speciality}
              </p>
              {doc.degree && (
                <p className="text-gray-500 text-xs mt-1">{doc.degree}</p>
              )}
            </div>
            <button
              className="mt-2 w-full bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-600 transition-colors duration-300"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/appointment/${doc._id}`);
                window.scrollTo(0, 0);
              }}
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedDoctors;
