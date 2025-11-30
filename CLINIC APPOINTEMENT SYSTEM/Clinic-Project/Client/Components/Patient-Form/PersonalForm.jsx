import React, { useState } from "react";
import './PersonalForm.css'

function PersonalForm() {
  const [form, setForm] = useState({
    fullName: "",
    gender: "",
    age: "",
    phone: "",
    email: "",
  });
  const updateForm = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };
    // console.log(form);
    
    return (
    <div className="form-container">
        <label>Full Name</label>
        <input name="fullName" value={form.fullName} onChange={updateForm} required />

        <label>Gender</label>
        <select name="gender" value={form.gender} onChange={updateForm} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <label>Age</label>
        <input type="number" name="age" value={form.age} onChange={updateForm} required />

        <label>Phone Number</label>
        <input type="tel" name="phone" value={form.phone} onChange={updateForm} required />

        <label>Email</label>
        <input type="email" name="email" value={form.email} onChange={updateForm} required />

    </div>
  );
}
export default PersonalForm;