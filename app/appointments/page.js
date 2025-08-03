"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import AuthGuard from "../components/AuthGuard";
import { FaCalendarPlus, FaCalendarAlt, FaUserMd, FaClock } from "react-icons/fa";

// MOCK data for demonstration. Replace this with your Firestore fetch.
const mockAppointments = [
  {
    id: "1",
    doctor: "Dr. Shalini Sharma",
    specialty: "Geriatric Medicine",
    date: "2024-07-20",
    time: "10:30 AM",
    mode: "Clinic Visit",
    status: "Upcoming",
  },
  {
    id: "2",
    doctor: "Dr. Ayush Gupta",
    specialty: "Nutritionist",
    date: "2024-07-15",
    time: "02:00 PM",
    mode: "Teleconsultation",
    status: "Completed",
  },
];

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);

  // Simulate loading data (replace with Firestore fetch)
  useEffect(() => {
    // TODO: Fetch appointments from Firebase for the logged-in user.
    setAppointments(mockAppointments);
  }, []);

  return (
    <AuthGuard>
      <main className="min-h-screen px-4 py-10 bg-gradient-to-br from-emerald-50 via-blue-50 to-cyan-100">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center mb-7"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-2 flex items-center justify-center gap-2">
            <FaCalendarAlt className="text-cyan-600" /> Your Appointments
          </h1>
          <p className="text-gray-700 text-lg md:text-xl mb-4">
            View and manage upcoming doctor or caregiver appointments.
          </p>
          <Link
            href="/appointments/book"
            className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-full font-semibold text-lg transition focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 shadow"
          >
            <FaCalendarPlus /> Book New Appointment
          </Link>
        </motion.div>

        {/* Appointments List */}
        <div className="max-w-3xl mx-auto">
          {appointments.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-500 mt-20 text-lg"
            >
              No appointments scheduled yet.
            </motion.div>
          ) : (
            <div className="grid gap-6">
              {appointments.map((appt) => (
                <motion.div
                  key={appt.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className={`flex flex-col md:flex-row justify-between items-center bg-white rounded-2xl px-6 py-5 shadow hover:shadow-lg border-2 ${
                    appt.status === "Upcoming"
                      ? "border-cyan-200"
                      : "border-gray-100 opacity-60"
                  } transition-all`}
                >
                  <div className="flex items-center gap-3 w-full">
                    <div>
                      <FaUserMd className="text-2xl text-emerald-500" />
                    </div>
                    <div>
                      <div className="text-lg md:text-xl font-semibold text-gray-800">
                        {appt.doctor}
                      </div>
                      <div className="text-gray-600 text-base">{appt.specialty}</div>
                      <div className="text-gray-500 text-sm mt-1">
                        {appt.mode}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col md:items-end md:text-right mt-4 md:mt-0">
                    <div className="flex items-center gap-2 text-cyan-700 text-lg font-medium">
                      <FaClock /> {appt.date}, {appt.time}
                    </div>
                    <span
                      className={`mt-2 px-3 py-1 text-sm rounded-full font-semibold ${
                        appt.status === "Upcoming"
                          ? "bg-cyan-100 text-cyan-800"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {appt.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="text-center mt-16 text-base text-gray-400 select-none">
          💚 Need help? Contact your care coordinator anytime.
        </footer>
      </main>
    </AuthGuard>
  );
}
