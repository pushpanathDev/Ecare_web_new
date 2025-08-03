// app/appointments/book/page.js
"use client";

import { useEffect, useState } from "react";
import { bookAppointment } from "@/services/appointmentService";
import { fetchCaretakers } from "@/services/caretakerService";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import { toast } from "react-hot-toast";
import Spinner from "../../components/spinner/spinner";


export default function BookAppointmentPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [caretakers, setCaretakers] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [selectedDateTime, setSelectedDateTime] = useState(null);

  const [formData, setFormData] = useState({
    reason: "",
    caretakerId: "",
  });

  useEffect(() => {
    const loadCaretakers = async () => {
      try {
        const data = await fetchCaretakers();
        setCaretakers(data);
      } catch (error) {
        console.error("Failed to fetch caretakers", error);
        toast.error("Failed to load caretakers.");
      }
    };
    loadCaretakers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid = () => {
    return (
      formData.reason.trim() !== "" &&
      formData.caretakerId !== "" &&
      selectedDateTime
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      setError("Please fill all fields before submitting.");
      toast.error("Please complete all fields.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const timeSlot = selectedDateTime.toISOString();

      await bookAppointment({
        userId: user.uid,
        caretakerId: formData.caretakerId,
        timeSlot,
        reason: formData.reason,
        status: "pending",
      });

      toast.success("Appointment booked successfully!");

      setTimeout(() => {
        router.push("/appointments");
      }, 1000); // short delay to show success toast
    } catch (err) {
      console.error(err);
      setError("Failed to book appointment.");
      toast.error("Failed to book appointment.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-4">Book an Appointment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Caretaker Dropdown */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Select Caretaker
          </label>
          <select
            name="caretakerId"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.caretakerId}
            onChange={handleChange}
            disabled={submitting}
          >
            <option value="">-- Select a caretaker --</option>
            {caretakers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Date-Time Picker */}
        <div>
          <label className="block text-sm font-medium mb-1">Date & Time</label>
          <DatePicker
            selected={selectedDateTime}
            onChange={(date) => setSelectedDateTime(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={30}
            dateFormat="MMMM d, yyyy h:mm aa"
            placeholderText="Select a date and time"
            className="w-full border border-gray-300 rounded-md p-2"
            disabled={submitting}
          />
        </div>

        {/* Reason */}
        <div>
          <label className="block text-sm font-medium">Reason</label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            required
            rows={3}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Describe your concern..."
            disabled={submitting}
          />
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitting || !isFormValid()}
          className={`w-full text-white rounded-md py-2 flex justify-center items-center gap-2 transition ${
            submitting || !isFormValid()
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {submitting ? (
            <>
              <Spinner /> Booking...
            </>
          ) : (
            "Book Appointment"
          )}
        </button>
      </form>
    </div>
  );
}
