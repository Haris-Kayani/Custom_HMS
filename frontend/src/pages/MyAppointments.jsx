import { useState, useEffect, useContext } from "react";
import { useLanguage } from "../context/LanguageContext";
import { Calendar, Clock, MapPin, Stethoscope } from "lucide-react";
import API from "../services/api";
import AppContext from "../context/AppContext";

const MyAppointments = () => {
  const { auth } = useContext(AppContext);
  const { theme } = useLanguage();
  const [appointments, setAppointments] = useState([]);

  const isDark = theme === "dark";
  const themeClass = (light, dark) => (isDark ? dark : light);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (auth.token) {
        try {
          const { data } = await API.get("/appointments/my-appointments");
          setAppointments(data.data);
        } catch (error) {
          console.error("Failed to fetch appointments", error);
        }
      }
    };
    fetchAppointments();
  }, [auth.token]);

  const statusColors = {
    confirmed: themeClass(
      "bg-green-100 text-green-800",
      "bg-green-900/30 text-green-400"
    ),
    pending: themeClass(
      "bg-yellow-100 text-yellow-800",
      "bg-yellow-900/30 text-yellow-400"
    ),
    completed: themeClass(
      "bg-blue-100 text-blue-800",
      "bg-blue-900/30 text-blue-400"
    ),
    cancelled: themeClass(
      "bg-red-100 text-red-800",
      "bg-red-900/30 text-red-400"
    ),
  };

  const handleCancelAppointment = async (appointmentId) => {
    try {
      await API.put(`/appointments/${appointmentId}/cancel`);
      setAppointments(
        appointments.map((apt) =>
          apt._id === appointmentId ? { ...apt, status: "cancelled" } : apt
        )
      );
    } catch (error) {
      console.error("Failed to cancel appointment", error);
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${themeClass(
        "bg-gray-50",
        "bg-gray-900"
      )}`}
    >
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1
            className={`text-3xl font-semibold mb-2 ${themeClass(
              "text-gray-900",
              "text-gray-100"
            )}`}
          >
            My Appointments
          </h1>
          <p className={`text-sm ${themeClass("text-gray-600", "text-gray-400")}`}>
            View and manage your upcoming appointments
          </p>
        </div>

        {/* Appointments Grid */}
        {appointments.length === 0 ? (
          <div
            className={`text-center py-16 rounded-lg border ${themeClass(
              "bg-white border-gray-200 text-gray-500",
              "bg-gray-800 border-gray-700 text-gray-400"
            )}`}
          >
            <Calendar className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg">No appointments scheduled</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {appointments.map((appointment) => {
              const { doctor } = appointment;
              if (!doctor) return null;

              return (
                <div
                  key={appointment._id}
                  className={`rounded-lg shadow-lg border transition-all duration-300 hover:shadow-xl ${themeClass(
                    "bg-white border-gray-200",
                    "bg-gray-800 border-gray-700"
                  )}`}
                >
                  {/* Card Header */}
                  <div className="p-5 border-b ${themeClass('border-gray-200', 'border-gray-700')}">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        {/* Avatar */}
                        <div className="relative">
                          <img
                            src={doctor.image || "https://via.placeholder.com/150"}
                            alt={`${doctor.firstName} ${doctor.lastName}`}
                            className="h-12 w-12 rounded-full object-cover"
                          />
                        </div>
                        {/* Doctor Info */}
                        <div className="flex-1 min-w-0">
                          <h3
                            className={`font-semibold text-lg leading-tight truncate ${themeClass(
                              "text-gray-900",
                              "text-gray-100"
                            )}`}
                          >
                            Dr. {doctor.firstName} {doctor.lastName}
                          </h3>
                          <div
                            className={`flex items-center gap-1.5 text-sm mt-0.5 ${themeClass(
                              "text-gray-600",
                              "text-gray-400"
                            )}`}
                          >
                            <Stethoscope className="h-3.5 w-3.5 flex-shrink-0" />
                            <span className="truncate">{doctor.speciality}</span>
                          </div>
                        </div>
                      </div>
                      {/* Status Badge */}
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                          statusColors[appointment.status]
                        }`}
                      >
                        {appointment.status}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 space-y-3">
                    {/* Date */}
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar
                        className={`h-4 w-4 flex-shrink-0 ${themeClass(
                          "text-gray-500",
                          "text-gray-400"
                        )}`}
                      />
                      <span
                        className={`font-medium ${themeClass(
                          "text-gray-900",
                          "text-gray-100"
                        )}`}
                      >
                        {new Date(appointment.appointmentDate).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Time */}
                    <div className="flex items-center gap-2 text-sm">
                      <Clock
                        className={`h-4 w-4 flex-shrink-0 ${themeClass(
                          "text-gray-500",
                          "text-gray-400"
                        )}`}
                      />
                      <span
                        className={themeClass("text-gray-700", "text-gray-300")}
                      >
                        {appointment.appointmentTime}
                      </span>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin
                        className={`h-4 w-4 flex-shrink-0 ${themeClass(
                          "text-gray-500",
                          "text-gray-400"
                        )}`}
                      />
                      <span
                        className={`text-sm ${themeClass(
                          "text-gray-700",
                          "text-gray-300"
                        )}`}
                      >
                        {doctor.address?.line1 || "N/A"}
                      </span>
                    </div>

                    {/* Appointment Type */}
                    <div
                      className={`pt-2 border-t ${themeClass(
                        "border-gray-200",
                        "border-gray-700"
                      )}`}
                    >
                      <span
                        className={`text-xs ${themeClass(
                          "text-gray-500",
                          "text-gray-400"
                        )}`}
                      >
                        Type:{" "}
                      </span>
                      <span
                        className={`text-sm font-medium ${themeClass(
                          "text-gray-900",
                          "text-gray-100"
                        )}`}
                      >
                        {appointment.appointmentType}
                      </span>
                    </div>

                    {/* Actions */}
                    {appointment.status !== "completed" && appointment.status !== "cancelled" && (
                      <div className="pt-2 flex gap-2">
                        <button
                          onClick={() => handleCancelAppointment(appointment._id)}
                          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200 border ${themeClass(
                            "bg-red-50 text-red-600 border-red-200 hover:bg-red-100",
                            "bg-red-900/20 text-red-400 border-red-800 hover:bg-red-900/30"
                          )}`}
                        >
                          Cancel
                        </button>
                        <button
                          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200 ${themeClass(
                            "bg-blue-600 text-white hover:bg-blue-700",
                            "bg-blue-500 text-white hover:bg-blue-600"
                          )}`}
                        >
                          Reschedule
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAppointments;