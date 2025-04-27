import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ClientProfile.css';

const ClientProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [programs, setPrograms] = useState([]); // List of all available programs
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [customNote, setCustomNote] = useState('');
  const [selectedProgramId, setSelectedProgramId] = useState('');

  useEffect(() => {
    // Fetch client info
    axios.get(`https://cema-health-1g0x.onrender.com/clients/${id}/`)
      .then(res => setClient(res.data))
      .catch(err => console.error('Failed to fetch client:', err));

    // Fetch programs
    axios.get('https://cema-health-1g0x.onrender.com/programs/')
      .then(res => setPrograms(res.data))
      .catch(err => console.error('Failed to fetch programs:', err));
  }, [id]);

  const handleBookAppointment = () => {
    axios.get('https://cema-health-1g0x.onrender.com/appointments/')
      .then(res => {
        const existingAppointment = res.data.find(
          (appt) => appt.client === parseInt(id)
        );

        if (existingAppointment) {
          if (window.confirm(`You already booked an appointment. Do you want to reschedule?`)) {
            actuallyBookAppointment();
          } else {
            setShowModal(false);
          }
        } else {
          actuallyBookAppointment();
        }
      })
      .catch(err => {
        console.error('Error checking appointments:', err);
        actuallyBookAppointment();
      });
  };

  const actuallyBookAppointment = () => {
    axios.post('https://cema-health-1g0x.onrender.com/appointments/', {
      client: id,
      doctor: 1, // Assuming doctor ID is 1 (you can improve this later)
      date: new Date().toISOString(),
      program: selectedProgramId,
      notes: customNote || 'No additional notes.'
    })
      .then(res => {
        setSuccessMessage('Appointment booked successfully! 🎉');
        setShowModal(false);
        setCustomNote('');
        setSelectedProgramId('');
      })
      .catch(err => {
        console.error('Failed to book appointment:', err);
        setSuccessMessage('Failed to book appointment. Please try again.');
        setShowModal(false);
      });
  };

  if (!client) {
    return <div>Loading client information...</div>;
  }

  return (
    <div className="client-profile">
      <div className="profile-header">
        <img 
          src={client.image_url 
            ? `https://cema-health-1g0x.onrender.com${client.image_url}` 
            : `https://ui-avatars.com/api/?name=${encodeURIComponent(client.name)}&background=random`} 
          alt={client.name || "Client"} 
          className="client-img" 
        />
        <h2>{client.name}</h2>
      </div>

      <div className="info-cards">
        <div className="info-card">
          <span className="info-label">📧 Email:</span>
          <span className="info-value">{client.email || 'Not provided'}</span>
        </div>
        <div className="info-card">
          <span className="info-label">📞 Phone:</span>
          <span className="info-value">{client.phone || 'Not provided'}</span>
        </div>
        <div className="info-card">
          <span className="info-label">🎂 Age:</span>
          <span className="info-value">{client.age || 'Not provided'}</span>
        </div>
        <div className="info-card">
          <span className="info-label">🌟 Interests:</span>
          <span className="info-value">{client.interests || 'Not provided'}</span>
        </div>
        <div className="info-card">
          <span className="info-label">📚 Enrolled Programs:</span>
          <span className="info-value">
            {client.enrolled_programs && client.enrolled_programs.length > 0
              ? client.enrolled_programs.join(', ')
              : 'None'}
          </span>
        </div>
      </div>

      <div className="actions">
        <button onClick={() => navigate('/clients')}>⬅️ Back to Client List</button>
        <button className="book-btn" onClick={() => setShowModal(true)}>📅 Book Appointment</button>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Book Appointment</h2>
            <p>Book an appointment with {client.name}:</p>

            {/* Program selection */}
            <select 
              value={selectedProgramId}
              onChange={(e) => setSelectedProgramId(e.target.value)}
              style={{ width: '100%', marginTop: '10px', padding: '8px' }}
            >
              <option value="">Select a program...</option>
              {programs.map(prog => (
                <option key={prog.id} value={prog.id}>
                  {prog.name}
                </option>
              ))}
            </select>

            {/* Notes */}
            <textarea 
              placeholder="Enter notes for the appointment..." 
              value={customNote}
              onChange={(e) => setCustomNote(e.target.value)}
              style={{ width: '100%', height: '100px', marginTop: '10px' }}
            ></textarea>

            <div className="modal-buttons">
              <button onClick={() => setShowModal(false)}>Cancel</button>
              <button className="confirm-btn" onClick={handleBookAppointment}>Confirm</button>
            </div>
          </div>
        </div>
      )}

      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default ClientProfile;
