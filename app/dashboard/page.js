"use client";

import React from "react";
import { motion } from "framer-motion";
import AuthGuard from "../components/AuthGuard";
import Link from "next/link";
import {
  FaStethoscope,
  FaRegCalendarCheck,
  FaSyringe,
  FaUserFriends,
  FaClock,
  FaHandsHelping,
  FaRegUserCircle,
} from "react-icons/fa";

export default function Dashboard() {
  return (
    <AuthGuard>
      <main className="min-h-screen px-4 py-14 md:py-20 bg-gradient-to-br from-emerald-50 via-blue-50 to-cyan-100 flex flex-col justify-center overlay">
        {/* HERO SECTION */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-emerald-800 mb-3 drop-shadow-sm">
            Welcome to{" "}
            <span className="text-cyan-700">Elderly Care Portal</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-xl mx-auto mb-8">
            Easily manage your health, stay updated with care programs, and
            access daily wellness support—all in one trusted place.
          </p>
        </motion.div>

        {/* CARDS */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-10 max-w-6xl mx-auto mt-6"
        >
          {/* Appointments Card */}
          <AnimatedCard>
            <FaRegCalendarCheck className="text-3xl text-indigo-500 mb-2 mx-auto" />
            <h2 className="text-2xl font-bold text-emerald-800 mb-1">
              Appointments
            </h2>
            <p className="text-base text-gray-600 mb-4 min-h-[40px]">
              View your upcoming appointments or schedule a new one with your
              healthcare provider.
            </p>
            <PrimaryLink href="/appointments" color="indigo">
              Manage Appointments
            </PrimaryLink>
          </AnimatedCard>

          {/* Care Programs Card */}

          <AnimatedCard>
            <FaHandsHelping className="text-3xl text-sky-500 mb-2 mx-auto" />
            <h2 className="text-2xl font-bold text-emerald-800 mb-1">
              Care Programs
            </h2>
            <p className="text-base text-gray-600 mb-4 min-h-[40px]">
              View & register for government/private health schemes, events, &
              camps.
            </p>
            <PrimaryLink href="/programs" color="sky">
              Browse Programs
            </PrimaryLink>
          </AnimatedCard>

          {/* Health Records Card */}
          <AnimatedCard>
            <FaStethoscope className="text-3xl text-cyan-600 mb-2 mx-auto" />
            <h2 className="text-2xl font-bold text-emerald-800 mb-1">
              Health Records
            </h2>
            <p className="text-base text-gray-600 mb-4 min-h-[40px]">
              Access & update your medical history and reports securely.
            </p>
            <PrimaryLink href="/health" color="emerald">
              View Health
            </PrimaryLink>
          </AnimatedCard>

          {/* Medicine Reminders Card */}
          <AnimatedCard>
            <FaSyringe className="text-3xl text-rose-400 mb-2 mx-auto" />
            <h2 className="text-2xl font-bold text-emerald-800 mb-1">
              Medicine Reminders
            </h2>
            <p className="text-base text-gray-600 mb-4 min-h-[40px]">
              Set up reminders and notifications for your medications.
            </p>
            <PrimaryLink href="/reminders" color="rose">
              Set Reminders
            </PrimaryLink>
          </AnimatedCard>

          {/* Assistance Requests Card */}
          <AnimatedCard>
            <FaUserFriends className="text-3xl text-violet-500 mb-2 mx-auto" />
            <h2 className="text-2xl font-bold text-emerald-800 mb-1">
              Request Assistance
            </h2>
            <p className="text-base text-gray-600 mb-4 min-h-[40px]">
              Connect with care-givers or arrange transport, home visits, and
              more.
            </p>
            <PrimaryLink href="/assistance" color="violet">
              Get Support
            </PrimaryLink>
          </AnimatedCard>

          {/* Wellness Resources Card */}
          <AnimatedCard>
            <FaClock className="text-3xl text-orange-400 mb-2 mx-auto" />
            <h2 className="text-2xl font-bold text-emerald-800 mb-1">
              Wellness Resources
            </h2>
            <p className="text-base text-gray-600 mb-4 min-h-[40px]">
              Access articles, videos, and tips for healthy living and mental
              wellness.
            </p>
            <PrimaryLink href="/wellness" color="orange">
              Explore Wellness
            </PrimaryLink>
          </AnimatedCard>

          {/* Profile Card */}
          <AnimatedCard>
            <FaRegUserCircle className="text-3xl text-cyan-600 mb-2 mx-auto" />
            <h2 className="text-2xl font-bold text-emerald-800 mb-1">
              Your Profile
            </h2>
            <p className="text-base text-gray-600 mb-4 min-h-[40px]">
              Update your contact, personal info, or emergency details.
            </p>
            <PrimaryLink href="/profile" color="cyan">
              Edit Profile
            </PrimaryLink>
          </AnimatedCard>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="text-center mt-20 text-base text-gray-400 select-none"
        >
          💚 Caring for our elders, every step of the way.
        </motion.footer>
      </main>
    </AuthGuard>
  );
}

// Animated Card Component for reuse
function AnimatedCard({ children }) {
  return (
    <motion.div
      whileHover={{
        scale: 1.04,
        boxShadow: "0 4px 24px rgba(16, 185, 129, 0.06)",
      }}
      whileTap={{ scale: 0.97 }}
      className="bg-white/80 backdrop-blur-md shadow-lg hover:shadow-2xl rounded-2xl p-6 min-h-[250px] border-2 border-gray-100 flex flex-col items-center justify-between transition-all duration-300"
      tabIndex={0}
    >
      {children}
    </motion.div>
  );
}

// Primary Link Button (color based on feature)
function PrimaryLink({ href, children, color = "sky" }) {
  const base =
    "inline-block px-5 py-2 mt-1 rounded-full font-semibold text-white transition-colors text-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2";
  const colorMap = {
    sky: "bg-sky-600 hover:bg-sky-700 focus:ring-sky-400",
    rose: "bg-rose-500 hover:bg-rose-600 focus:ring-rose-400",
    cyan: "bg-cyan-600 hover:bg-cyan-700 focus:ring-cyan-400",
    emerald: "bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-400",
    violet: "bg-violet-600 hover:bg-violet-700 focus:ring-violet-400",
    orange: "bg-orange-500 hover:bg-orange-600 focus:ring-orange-400",
  };
  return (
    <Link href={href} className={`${base} ${colorMap[color] || colorMap.sky}`}>
      {children}
    </Link>
  );
}
