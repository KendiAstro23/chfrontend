// src/pages/Services.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Services.css';
import Card from '../components/Card';

const Services = () => {
  const [programs, setPrograms] = useState([]);
  const [newProgramName, setNewProgramName] = useState('');
  const [newProgramDescription, setNewProgramDescription] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchPrograms();
  }, []);

  // Fetch programs from the backend
  const fetchPrograms = () => {
    axios.get('https://cema-health-1g0x.onrender.com/programs/')
      .then(res => setPrograms(res.data))
      .catch(err => console.error('Failed to fetch programs:', err));
  };

  // Handle adding a new program
  const handleAddProgram = (e) => {
    e.preventDefault();

    axios.post('https://cema-health-1g0x.onrender.com/programs/', {
      name: newProgramName,
      description: newProgramDescription,
      // No need to handle imageUrl anymore — backend can handle default if needed
    })
    .then(() => {
      setSuccessMessage('New Health Program added successfully! 🎉');
      setNewProgramName('');
      setNewProgramDescription('');
      fetchPrograms(); // Refresh programs
      setTimeout(() => setSuccessMessage(''), 3000); // Clear message after 3 seconds
    })
    .catch(err => console.error('Failed to add program:', err));
  };

  return (
    <div className="services-page">
      <h1 className="services-title">Our Health Programs</h1>

      <form onSubmit={handleAddProgram} className="add-program-form">
        <input
          type="text"
          placeholder="Program Name"
          value={newProgramName}
          onChange={(e) => setNewProgramName(e.target.value)}
          required
        />
        <textarea
          placeholder="Program Description"
          value={newProgramDescription}
          onChange={(e) => setNewProgramDescription(e.target.value)}
          required
        />
        <button type="submit">➕ Add New Program</button>
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
      </form>

      <div className="service-cards">
        {programs.map((program) => (
          <Card
            key={program.id}
            serviceId={program.id}
            title={program.name}
            description={program.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Services;
