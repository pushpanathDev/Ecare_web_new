// app/config/role-access.config.js

export const ROLES = {
  PATIENT: "patient",
  CARETAKER: "caretaker",
  DOCTOR: "doctor",
  ADMIN: "admin",
};

// Centralized access and UI visibility config
export const ROLE_ACCESS = {
  [ROLES.PATIENT]: {
    homeRoute: "/dashboard", // redirect after login
    allowedRoutes: ["/dashboard", "/appointments", "/profile"],
    visibleTabs: [
      { name: "Dashboard", path: "/dashboard" },
      { name: "Appointments", path: "/appointments" },
      { name: "Profile", path: "/profile" },
    ],
  },
  [ROLES.CARETAKER]: {
    homeRoute: "/caretaker-dashboard",
    allowedRoutes: ["/caretaker-dashboard", "/monitor", "/profile"],
    visibleTabs: [
      { name: "Home", path: "/caretaker-dashboard" },
      { name: "Monitor", path: "/monitor" },
      { name: "Profile", path: "/profile" },
    ],
  },
  [ROLES.DOCTOR]: {
    homeRoute: "/doctor-dashboard",
    allowedRoutes: ["/doctor-dashboard", "/patients", "/profile","/appointments"],
    visibleTabs: [
      { name: "Dashboard", path: "/doctor-dashboard" },
      { name: "Patients", path: "/patients" },
      { name: "Profile", path: "/profile" },
    ],
  },
  [ROLES.ADMIN]: {
    homeRoute: "/admin",
    allowedRoutes: ["/admin", "/settings", "/users"],
    visibleTabs: [
      { name: "Admin", path: "/admin" },
      { name: "Settings", path: "/settings" },
      { name: "Users", path: "/users" },
    ],
  },
  // Add others similarly...
};
