import React from 'react'
import { doctors } from '../assets/assets'
import { Link } from 'react-router-dom';

export const DoctorList = () => {
  return (
    <div className="flex flex-col items-center gap-4 py-16 text-gray-800">
      <h1 className="text-3xl font-medium">Specialist Doctors to Book</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Book your appointment with our specialist doctors
      </p>

      <div className="flex justify-center gap-8 pt-5 w-full overflow-x-auto p-4">
        {doctors.slice(0, 5).map((doc, index) => (
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
              to={`/appointment/${doc._id}`} // Assuming you have a route for booking an appointment with a specific doctor
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-600 transition-colors duration-300"
            >
              Book Now
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
export default DoctorList