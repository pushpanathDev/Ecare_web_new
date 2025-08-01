// ✅ app/layout.js
import "./globals.css";
import { AuthContextProvider } from "./context/AuthContext";
import Navbar from "./components/navbar/page";

export const metadata = {
  title: "Elderly Care App",
  description: "Secure app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthContextProvider>
          <Navbar /> {/* ✅ ALWAYS rendered */}
          <main className="pt-16">{children}</main>
        </AuthContextProvider>
      </body>
    </html>
  );
}
