// components/Navbar.js

"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import { signOut } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { FiMenu, FiX, FiUser, FiLogOut, FiLayout, FiCalendar, FiHeart, FiHelpCircle } from "react-icons/fi";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, loading } = useAuth();
  const [userName, setUserName] = useState("");
  const profileMenuRef = useRef(null);

  // Simplified handler to close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch user's name from Firestore
  useEffect(() => {
    const fetchUserName = async () => {
      if (user) {
        try {
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);
          const nameFromDB = userSnap.exists() ? userSnap.data().name : "";
          setUserName(nameFromDB || user.displayName || "User");
        } catch (err) {
          console.error("Failed to fetch user name:", err);
          setUserName(user.displayName || "User");
        }
      }
    };

    if (user) {
      fetchUserName();
    }
  }, [user]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setIsProfileOpen(false); // Close menu on sign out
      setIsMobileMenuOpen(false);
    } catch (err) {
      console.error("Failed to sign out:", err);
    }
  };

  // Common NavLink styles for reuse
  const navLinkClasses = "px-4 py-2 text-warm-gray-dark hover:text-care-blue-dark hover:bg-care-blue-light rounded-md transition-all duration-300 flex items-center gap-2";
  const mobileNavLinkClasses = "block " + navLinkClasses;

  const renderNavLinks = (isMobile = false) => (
    <>
      <Link href="/dashboard" className={isMobile ? mobileNavLinkClasses : navLinkClasses}>
        <FiLayout /> Dashboard
      </Link>
      <Link href="/appointments" className={isMobile ? mobileNavLinkClasses : navLinkClasses}>
        <FiCalendar /> Appointments
      </Link>
      <Link href="/medications" className={isMobile ? mobileNavLinkClasses : navLinkClasses}>
        <FiHeart /> Medications
      </Link>
      <Link href="/support" className={isMobile ? mobileNavLinkClasses : navLinkClasses}>
        <FiHelpCircle /> Support
      </Link>
    </>
  );

  return (
    <nav className="bg-white/80 backdrop-blur-lg fixed top-0 left-0 w-full z-50 border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-care-blue-dark font-bold text-xl">
            <FiHeart className="text-care-blue" />
            <span>SereneCare</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2 font-medium">
            {user && renderNavLinks()}
          </div>

          {/* Right side: Profile or Login */}
          <div className="hidden md:flex items-center">
            {loading ? (
              <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
            ) : user ? (
              <div ref={profileMenuRef} className="relative">
                <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="focus:outline-none rounded-full">
                  <img
                    src={user.photoURL || `https://api.dicebear.com/8.x/initials/svg?seed=${userName}`}
                    alt="Profile"
                    className="w-10 h-10 rounded-full border-2 border-care-blue hover:scale-105 transition-transform"
                  />
                </button>
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 animate-fadeIn overflow-hidden">
                    <div className="p-4 border-b border-gray-200 bg-care-blue-light">
                      <p className="font-semibold text-care-blue-dark">{userName}</p>
                      <p className="text-sm text-warm-gray">{user.email}</p>
                    </div>
                    <div className="py-2">
                       <Link href="/profile" className="flex items-center gap-3 px-4 py-2 text-warm-gray-dark hover:bg-care-blue-light transition-colors">
                          <FiUser/> My Profile
                       </Link>
                       <button onClick={handleSignOut} className="w-full text-left flex items-center gap-3 px-4 py-2 text-red-500 hover:bg-red-50 transition-colors">
                          <FiLogOut /> Logout
                       </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="px-5 py-2.5 text-white bg-care-blue-dark rounded-full font-semibold hover:bg-opacity-90 transition-all">
                Login / Sign Up
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-warm-gray-dark focus:outline-none"
            >
              {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg animate-slideDown border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {loading ? (
              <p className="p-4 text-center text-warm-gray">Loading...</p>
            ) : user ? (
              <>
                <div className="p-4 border-b border-gray-200 flex items-center gap-3">
                  <img
                    src={user.photoURL || `https://api.dicebear.com/8.x/initials/svg?seed=${userName}`}
                    alt="Profile"
                    className="w-10 h-10 rounded-full border-2 border-care-blue"
                  />
                  <div>
                    <p className="font-semibold text-care-blue-dark">{userName}</p>
                    <p className="text-sm text-warm-gray">{user.email}</p>
                  </div>
                </div>
                <div className="mt-2 space-y-1">
                  {renderNavLinks(true)}
                </div>
                <div className="pt-4 mt-4 border-t border-gray-200">
                  <button onClick={handleSignOut} className="w-full text-left flex items-center gap-3 px-4 py-2 text-red-500 hover:bg-red-50 rounded-md transition-colors">
                    <FiLogOut /> Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="p-4">
                <Link href="/login" className="block w-full text-center px-5 py-2.5 text-white bg-care-blue-dark rounded-full font-semibold hover:bg-opacity-90 transition-all">
                  Login / Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;