import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

const steps = ['Personal Details', 'Appointment Details'];

export default function HorizontalNonLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const totalSteps = () => steps.length;
  const completedSteps = () => Object.keys(completed).length;
  const isLastStep = () => activeStep === totalSteps() - 1;
  const allStepsCompleted = () => completedSteps() === totalSteps();

  const userId = location.pathname.toString().split('/')[2]
  const handleNext = async () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;

    setActiveStep(newActiveStep);
    if (activeStep === totalSteps() - 1) {
      console.log(form);
      setForm({
        patientName: "",
        gender: "",
        age: "",
        phone: "",
        email: "",
        doctor: "",
        date: "",
        time: "",
        disease: ""
      })
      const res = await axios.post(`http://localhost:8000/api/profile/${userId}/appointments`, { form }, { withCredentials: true });
      console.log(res);

    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => setActiveStep(step);

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };
  const [form, setForm] = useState({
    patientName: "",
    gender: "",
    age: "",
    phone: "",
    email: "",
    doctor: "",
    date: "",
    time: "",
    disease: ""
  });
  const updateForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const doctors = [
    "Dr. John Doe",
    "Dr. Jane Smith",
    "Dr. Michael Watson",
  ];


  
  const [appointmentsByDoctor, setAppointmentsByDoctor] = useState({
    "Dr. John Doe": { dates: {} },
    "Dr. Jane Smith": { dates: {} },
    "Dr. Michael Watson": { dates: {} }
  });
  
  useEffect(() => {
    const getAppointmentsData = async () => {
      const appointmentsData = await axios.get(`http://localhost:8000/api/profile/${userId}/appointments`, { withCredentials: true })
      console.log(appointmentsData);
  
      const temp = {
        "Dr. John Doe": { dates: {} },
        "Dr. Jane Smith": { dates: {}},
        "Dr. Michael Watson": { dates: {}}
      };
      
      appointmentsData.data.allAppointments.forEach(app => {
        temp[app.doctor].dates[app.date] = []
        temp[app.doctor].dates[app.date].push(app.time);
      });
      setAppointmentsByDoctor(temp);
      console.log(appointmentsByDoctor);
    }
    
    getAppointmentsData()
  }, [userId])

  
  function getNextWeekDates() {
    const dates = [];
    let current = new Date();

    // start from tomorrow
    current.setDate(current.getDate() + 1);

    // collect 6 valid days (excluding Sundays)
    while (dates.length < 6) {
      if (current.getDay() !== 0) {
        // 0 = Sunday
        dates.push(current.toISOString().split("T")[0]);
      }
      current.setDate(current.getDate() + 1);
    }
    return dates;
  }
  const weekDates = getNextWeekDates()
  

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
  
  const selectedDoctor = form.doctor;
  const selectedDate = form.date;

  
  const timeSlots = selectedDoctor && selectedDate
    ? generateTimeSlots().filter(slot => !(appointmentsByDoctor[selectedDoctor]?.dates[selectedDate] || []).includes(slot))
    : generateTimeSlots();
  
  return (
    <Box sx={{ width: '50%', marginLeft: "30vh" }}>
      <Stepper nonLinear activeStep={activeStep} >
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>

      <div>
        {allStepsCompleted() ? (
          <>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed – you're finished!
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
          </>
        ) : (
          <>
            <Box sx={{ mt: 3 }}>
              {activeStep === 0 && <div className="form-container">
                <label>Patient Name</label>
                <input name="patientName" value={form.patientName} onChange={updateForm} required />

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

              </div>}
              {activeStep === 1 && <div className="form-container">

                <label>Doctor Name</label>
                <select name="doctor" value={form.doctor} onChange={updateForm} required>
                  <option value="">Select Doctor</option>
                  {doctors.map((doc, idx) => (
                    <option key={idx} value={doc}>{doc}</option>
                  ))}
                </select>

                <label>Appointment Date</label>
                <select name="date" value={form.date} onChange={updateForm} required>
                  <option value="">Select Date</option>
                  {weekDates.map((d, idx) => (
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

                <label>Any Disease Existed</label>
                <input name="disease" value={form.disease} onChange={updateForm} required placeholder='Mention Here..' />
              </div>}
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>

                <Box sx={{ flex: '1 1 auto' }} />

                <Button onClick={handleNext}>
                  {isLastStep() ? 'Book' : 'Next'}
                </Button>
              </Box>
            </Box>

          </>
        )}
      </div>
    </Box>
  );
}
