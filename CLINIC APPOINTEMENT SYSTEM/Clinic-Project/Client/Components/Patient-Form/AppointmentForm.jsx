import React, { useState } from "react";

const doctors = [
  "Dr. John Doe",
  "Dr. Jane Smith",
  "Dr. Michael Watson",
];
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const generateTimeSlots = () => {
    const slots = [];
    let start = 6; // 6 PM
    let end = 10; // 10 PM

    for (let hour = start; hour < end; hour++) {
        slots.push(`${hour}:00`);
        slots.push(`${hour}:30`);
    }
    return slots;
};

const timeSlots = generateTimeSlots();

export default function AppointmentForm() {
    const [form, setForm] = useState({
        doctor: "",
        day: "",
        time: "",
    });

    const updateForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };


    return (
        <div className="form-container">

            <label>Doctor Name</label>
            <select name="doctor" value={form.doctor} onChange={updateForm} required>
                <option value="">Select Doctor</option>
                {doctors.map((doc, idx) => (
                    <option key={idx} value={doc}>{doc}</option>
                ))}
            </select>

            <label>Appointment Day</label>
            <select name="day" value={form.day} onChange={updateForm} required>
                <option value="">Select Day</option>
                {days.map((d, idx) => (
                    <option key={idx} value={d}>{d}</option>
                ))}
            </select>

            <label>Appointment Time Slot</label>
            <select name="time" value={form.time} onChange={updateForm} required>
                <option value="">Select Time</option>
                {timeSlots.map((t, idx) => (
                    <option key={idx} value={t}>{t}</option>
                ))}
            </select>

        </div>
    );
}
