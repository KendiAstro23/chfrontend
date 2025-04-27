import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AppointmentsPage.css';

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = () => {
    axios.get('https://cema-health-1g0x.onrender.com/appointments/')
      .then(res => {
        console.log('Fetched appointments:', res.data);  // debug
        setAppointments(res.data);
      })
      .catch(err => console.error('Failed to fetch appointments:', err));
  };

  const handleDeleteAppointment = (id) => {
    axios.delete(`https://cema-health-1g0x.onrender.com/appointments/${id}/`)
      .then(() => {
        setAppointments(prev => prev.filter(appt => appt.id !== id));
      })
      .catch(err => console.error('Failed to cancel appointment:', err));
  };

  const getProgramClass = (notes) => {
    if (notes.includes('Nutrition')) return 'notes-nutrition';
    if (notes.includes('Mental Health Therapy')) return 'notes-mental';
    if (notes.includes('Physical Rehabilitation')) return 'notes-physical';
    if (notes.includes('Chronic Disease Management')) return 'notes-chronic';
    if (notes.includes('Preventive Screenings')) return 'notes-preventive';
    if (notes.includes('Wellness Coaching')) return 'notes-wellness';
    return '';
  };

  return (
    <div className="appointments-page" style={{ backgroundColor: '#f0f8ff', minHeight: '100vh', padding: '20px' }}>
      <h1>📅 Your Appointments</h1>

      {appointments.length === 0 ? (
        <p>No appointments booked yet.</p>
      ) : (
        <ul className="appointments-list">
          {appointments.map(appointment => (
            <li key={appointment.id} className="appointment-item">
              <div className={`notes-tag ${getProgramClass(appointment.notes)}`}>
                {appointment.program_name || 'Program'}
              </div>
              <h3>👤 {appointment.client_name}</h3>
              <p><strong>Date:</strong> {new Date(appointment.date).toLocaleString()}</p>
              <p><strong>Notes:</strong> {appointment.notes}</p>
              <button className="cancel-btn" onClick={() => handleDeleteAppointment(appointment.id)}>
                ❌ Cancel Appointment
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AppointmentsPage;
