import React from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import AppContext from "../context/AppContext";




export const DoctorList = () => {
  const { doctors } = React.useContext(AppContext);
  const scrollRef = React.useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col items-center gap-4 py-16 text-gray-800">
      <h1 className="text-3xl font-medium">Specialist Doctors to Book</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Book your appointment with our specialist doctors
      </p>

      <div className="flex flex-col items-center gap-8 pt-5 w-full">
        <div ref={scrollRef} className="flex justify-center gap-8 w-full overflow-x-auto p-4">
          {doctors.map((doc, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center cursor-pointer gap-2 flex-shrink-0 hover:translate-y-[-10px] transition-transform duration-300 bg-white p-6 rounded-lg shadow-lg w-60"
            >
              <img
                src={doc.image}
                alt={doc.name}
                className="w-32 h-32 object-cover rounded-full mb-4 border-4 border-blue-100"
              />
              <h2 className="font-semibold text-xl">{doc.name}</h2>
              <p className="text-gray-500 text-sm">{doc.speciality}</p>
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
