import { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import AppContext from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "./RelatedDoctors";
import { useLanguage } from "../context/LanguageContext";
import API from "../services/api";

const DAYS_OF_WEEK = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

export const Appointment = () => {
  const { doctorID } = useParams();
  const navigate = useNavigate();
  const { auth } = useContext(AppContext);
  const { theme } = useLanguage();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [reason, setReason] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [appointmentType, setAppointmentType] = useState("In-Person");
  const [notes, setNotes] = useState("");

  const isDark = theme === "dark";
  const themeClass = (light, dark) => (isDark ? dark : light);

  const [availableDays, setAvailableDays] = useState([]);

  // Time slots
  const timeSlots = [
    "08:00 AM",
    "08:30 AM",
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
    "05:00 PM",
  ];

  useEffect(() => {
    const fetchDoctor = async () => {
      setLoading(true);
      setError("");
      try {
        const { data } = await API.get(`/doctors/${doctorID}`);
        setDoctor(data.data || data);
      } catch (err) {
        const message = err.response?.data?.message || "Failed to load doctor";
        setError(message);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    // Generate next 7 days
    const days = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push({
        day: DAYS_OF_WEEK[date.getDay()],
        date: date.getDate(),
        month: date.toLocaleString("default", { month: "short" }),
        fullDate: date,
      });
    }
    setAvailableDays(days);
    setSelectedDay(days[0]); // Select first day by default

    fetchDoctor();
  }, [doctorID]);

  const handleBookAppointment = async () => {
    if (!auth?.token) {
      toast.error("Please login to book an appointment");
      navigate("/my-profile");
      return;
    }

    if (!selectedDay || !selectedTime) {
      toast.error("Please select both a day and time slot");
      return;
    }

    if (!doctor?._id) {
      toast.error("Doctor information is missing");
      return;
    }

    const payload = {
      doctor: doctor._id,
      appointmentDate: selectedDay.fullDate.toISOString(),
      appointmentTime: selectedTime,
      reasonForVisit: reason,
      symptoms: symptoms
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      appointmentType,
      notes,
    };

    try {
      await API.post("/appointments", payload);
      toast.success("Appointment booked successfully");
      navigate("/my-appointments");
    } catch (err) {
      const message = err.response?.data?.message || "Failed to book appointment";
      toast.error(message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-6xl mb-4">⏳</div>
          <p className={`text-xl ${themeClass("text-gray-600", "text-gray-400")}`}>
            Loading doctor information...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <p className={`text-xl ${themeClass("text-gray-600", "text-gray-400")}`}>
            {error}
          </p>
        </div>
      </div>
    );
  }

  if (!doctor) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Doctor Details Card */}
      <div
        className={`rounded-2xl shadow-2xl overflow-hidden mb-12 ${themeClass(
          "bg-white",
          "bg-gray-800"
        )}`}
      >
        <div className="md:flex">
          {/* Doctor Image */}
          <div
            className={`md:w-1/3 p-8 flex items-center justify-center ${themeClass(
              "bg-gradient-to-br from-blue-50 to-blue-100",
              "bg-gradient-to-br from-blue-900/30 to-blue-800/30"
            )}`}
          >
            <div className="relative">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-64 h-64 object-cover rounded-full border-8 border-white shadow-xl"
              />
              <div className="absolute bottom-4 right-4 w-8 h-8 bg-green-500 rounded-full border-4 border-white"></div>
            </div>
          </div>

          {/* Doctor Info */}
          <div className="md:w-2/3 p-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1
                  className={`text-3xl font-bold mb-2 ${themeClass(
                    "text-gray-800",
                    "text-white"
                  )}`}
                >
                  Dr. {doctor.firstName} {doctor.lastName}
                </h1>
                <p
                  className={`text-lg font-semibold mb-3 ${themeClass(
                    "text-blue-600",
                    "text-blue-400"
                  )}`}
                >
                  {doctor.speciality.name}
                </p>
                <div className="flex items-center gap-4 mb-4">
                  {doctor.degree && (
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${themeClass(
                        "bg-blue-100 text-blue-700",
                        "bg-blue-900 text-blue-300"
                      )}`}
                    >
                      {doctor.degree}
                    </span>
                  )}
                  {doctor.experience && (
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${themeClass(
                        "bg-green-100 text-green-700",
                        "bg-green-900 text-green-300"
                      )}`}
                    >
                      {doctor.experience} Experience
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <img
                  src={assets.verified_icon}
                  alt="verified"
                  className="w-6 h-6"
                />
                <span className="text-green-600 font-semibold">Verified</span>
              </div>
            </div>

            {/* About */}
            <div className="mb-6">
              <h3
                className={`text-lg font-bold mb-2 flex items-center gap-2 ${themeClass(
                  "text-gray-800",
                  "text-white"
                )}`}
              >
                <img src={assets.info_icon} alt="info" className="w-5 h-5" />
                About
              </h3>
              <p
                className={`leading-relaxed ${themeClass(
                  "text-gray-600",
                  "text-gray-400"
                )}`}
              >
                {doctor.about}
              </p>
            </div>

            {/* Fee and Address */}
            <div className="grid md:grid-cols-2 gap-6">
              <div
                className={`rounded-xl p-4 ${themeClass(
                  "bg-gray-50",
                  "bg-gray-700"
                )}`}
              >
                <p
                  className={`text-sm mb-1 ${themeClass(
                    "text-gray-600",
                    "text-gray-400"
                  )}`}
                >
                  Appointment Fee
                </p>
                <p
                  className={`text-2xl font-bold ${themeClass(
                    "text-gray-800",
                    "text-white"
                  )}`}
                >
                  Rs. {doctor.fees}
                </p>
              </div>
              <div
                className={`rounded-xl p-4 ${themeClass(
                  "bg-gray-50",
                  "bg-gray-700"
                )}`}
              >
                <p
                  className={`text-sm mb-1 ${themeClass(
                    "text-gray-600",
                    "text-gray-400"
                  )}`}
                >
                  Address
                </p>
                <p
                  className={`font-medium ${themeClass(
                    "text-gray-800",
                    "text-white"
                  )}`}
                >
                  {doctor.address?.line1 || "N/A"}
                </p>
                <p
                  className={`text-sm ${themeClass(
                    "text-gray-600",
                    "text-gray-400"
                  )}`}
                >
                  {doctor.address?.line2 || ""}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Section */}
      <div
        className={`rounded-2xl shadow-xl p-8 mb-12 ${themeClass(
          "bg-white",
          "bg-gray-800"
        )}`}
      >
        <h2
          className={`text-2xl font-bold mb-6 ${themeClass(
            "text-gray-800",
            "text-white"
          )}`}
        >
          Book Appointment
        </h2>

        {/* Appointment Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className={`block text-sm font-medium ${themeClass("text-gray-700", "text-gray-300")}`}>Reason for Visit</label>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${themeClass("border-gray-300", "bg-gray-700 border-gray-600 text-white")}`}
            />
          </div>
          <div>
            <label className={`block text-sm font-medium ${themeClass("text-gray-700", "text-gray-300")}`}>Symptoms (comma separated)</label>
            <input
              type="text"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${themeClass("border-gray-300", "bg-gray-700 border-gray-600 text-white")}`}
            />
          </div>
          <div>
            <label className={`block text-sm font-medium ${themeClass("text-gray-700", "text-gray-300")}`}>Appointment Type</label>
            <select
              value={appointmentType}
              onChange={(e) => setAppointmentType(e.target.value)}
              className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${themeClass("border-gray-300", "bg-gray-700 border-gray-600 text-white")}`}
            >
              <option>In-Person</option>
              <option>Video Call</option>
              <option>Phone Call</option>
            </select>
          </div>
          <div>
            <label className={`block text-sm font-medium ${themeClass("text-gray-700", "text-gray-300")}`}>Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows="3"
              className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${themeClass("border-gray-300", "bg-gray-700 border-gray-600 text-white")}`}
            ></textarea>
          </div>
        </div>

        {/* Select Day */}
        <div className="mb-8">
          <h3
            className={`text-lg font-semibold mb-4 ${themeClass(
              "text-gray-700",
              "text-gray-300"
            )}`}
          >
            Select Day
          </h3>
          <div className="flex flex-wrap gap-3">
            {availableDays.map((day, index) => (
              <button
                key={index}
                onClick={() => {
                  setSelectedDay(day);
                  setSelectedTime(null); // Reset time when day changes
                }}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 min-w-[100px] ${
                  selectedDay?.date === day.date
                    ? "bg-blue-600 text-white"
                    : themeClass(
                        "bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-400",
                        "bg-gray-700 text-gray-300 border-2 border-gray-600 hover:border-blue-500"
                      )
                }`}
              >
                <div className="text-center">
                  <div className="text-sm font-bold">{day.day}</div>
                  <div className="text-xs mt-1">
                    {day.month} {day.date}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Select Time */}
        <div className="mb-8">
          <h3
            className={`text-lg font-semibold mb-4 ${themeClass(
              "text-gray-700",
              "text-gray-300"
            )}`}
          >
            Select Time Slot
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {timeSlots.map((time, index) => (
              <button
                key={index}
                onClick={() => setSelectedTime(time)}
                className={`px-4 py-3 rounded-full font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 ${
                  selectedTime === time
                    ? "bg-blue-600 text-white"
                    : themeClass(
                        "bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-400",
                        "bg-gray-700 text-gray-300 border-2 border-gray-600 hover:border-blue-500"
                      )
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        {/* Book Button */}
        <div className="flex justify-center">
          <button
            onClick={handleBookAppointment}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-12 py-4 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Book Appointment
          </button>
        </div>

        {/* Selected Info */}
        {selectedDay && selectedTime && (
          <div
            className={`mt-6 p-4 rounded-xl border-l-4 border-blue-500 ${themeClass(
              "bg-blue-50",
              "bg-blue-900/30"
            )}`}
          >
            <p className={themeClass("text-gray-700", "text-gray-300")}>
              <span className="font-semibold">Selected:</span> {selectedDay.day}
              , {selectedDay.month} {selectedDay.date} at {selectedTime}
            </p>
          </div>
        )}
      </div>

      {/* Related Doctors */}
      <RelatedDoctors doctorId={doctor._id} speciality={doctor.speciality.name} />
    </div>
  );
};
