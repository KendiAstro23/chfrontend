import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './BookProgramPage.css';

const BookProgramPage = () => {
  const { id } = useParams();
  const [program, setProgram] = useState(null);
  const [clientName, setClientName] = useState('');
  const [clientAge, setClientAge] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [selectedPrograms, setSelectedPrograms] = useState([]);
  const [clientInterests, setClientInterests] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [programs, setPrograms] = useState([]);
  const [newProgramName, setNewProgramName] = useState('');
  const [newProgramDescription, setNewProgramDescription] = useState('');
  const [isNewProgram, setIsNewProgram] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    axios.get(`https://cema-health-1g0x.onrender.com/programs/${id}/`)
      .then(res => setProgram(res.data))
      .catch(err => console.error('Failed to fetch program:', err));

    axios.get('https://cema-health-1g0x.onrender.com/programs/')
      .then(res => setPrograms(res.data))
      .catch(err => console.error('Failed to fetch programs:', err));
  }, [id]);

  const handleProgramChange = (e) => {
    const programId = e.target.value;
    const program = programs.find(p => p.id === parseInt(programId));
    setSelectedProgram(program);
    setNewProgramName('');

    if (programId === 'new') {
      setIsNewProgram(true);
    } else {
      setIsNewProgram(false);
    }
  };

  const handleAddNewProgram = async (e) => {
    e.preventDefault();

    if (!newProgramName || !newProgramDescription) {
      setErrorMessage('❌ Please fill in both fields to add a new program.');
      return;
    }

    try {
      const newProgram = {
        name: newProgramName,
        description: newProgramDescription,
      };
      const response = await axios.post('https://cema-health-1g0x.onrender.com/programs/', newProgram);

      setPrograms(prevPrograms => [...prevPrograms, response.data]);
      setSelectedProgram(response.data);
      setNewProgramName('');
      setNewProgramDescription('');
      setIsNewProgram(false);
      setErrorMessage('');
    } catch (error) {
      console.error('Error adding new program:', error.response ? error.response.data : error.message);
      setErrorMessage('❌ Failed to add new program.');
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!clientName.trim() || !selectedProgram || !appointmentDate || !appointmentTime) {
      setErrorMessage('❌ Please fill all required fields.');
      return;
    }

    try {
      // 1. Create the client
      const clientPayload = {
        name: clientName.trim(),
        age: clientAge,  // Send age as number
        phone: clientPhone.trim() || null,  // Optional phone
        email: clientEmail.trim(),
        image_url: imageUrl.trim() || null,  // Optional image URL
        interests: clientInterests.trim() || "",  // Optional interests
        enrolled_programs: selectedPrograms,  // Optional, send as array of program IDs
      };
      
      const clientRes = await axios.post('https://cema-health-1g0x.onrender.com/clients/', clientPayload);
      const clientId = clientRes.data.id;
    
      const appointmentPayload = {
        client: clientId,
        doctor: 1,  // Assuming the doctor ID is 1 for now
        date: `${appointmentDate}T${appointmentTime}`,
        notes: `Appointment for program: ${selectedProgram.name}`,
        program: selectedProgram.id,
      };
    
      await axios.post('https://cema-health-1g0x.onrender.com/appointments/', appointmentPayload);
    
      setSuccessMessage('✅ Appointment booked successfully!');
      setErrorMessage('');
      // Clear form after success
      setClientName('');
      setClientAge('');
      setClientPhone('');
      setClientEmail('');
      setImageUrl('');
      setClientInterests('');
      setSelectedPrograms([]);
    } catch (error) {
      console.error('Booking Error:', error.response ? error.response.data : error.message);
      setErrorMessage('❌ Failed to book appointment. Please check your inputs and try again.');
    }
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageUrl(URL.createObjectURL(file)); // Update URL preview for the file
    }
  };

  if (!program) {
    return <div>Loading program details...</div>;
  }

  return (
    <div className="book-program-page">
      <h1>Book Appointment for {program.name}</h1>

      <form onSubmit={handleBooking}>
        <input
          type="text"
          placeholder="Enter Client Name"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="25"
          value={clientAge}
          onChange={(e) => setClientAge(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="0700 123 456"
          value={clientPhone}
          onChange={(e) => setClientPhone(e.target.value)}
        />
        <input
          type="email"
          placeholder="you@example.com"
          value={clientEmail}
          onChange={(e) => setClientEmail(e.target.value)}
          required
        />

        {/* Input for Image URL or File */}
        <div>
          <input
            type="url"
            placeholder="Enter Image URL (optional)"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageFileChange}
          />
        </div>

        <textarea
          value={clientInterests}
          onChange={(e) => setClientInterests(e.target.value)}
          placeholder="Enter Interests"
        />

        <input
          type="date"
          value={appointmentDate}
          onChange={(e) => setAppointmentDate(e.target.value)}
          required
        />
        <input
          type="time"
          value={appointmentTime}
          onChange={(e) => setAppointmentTime(e.target.value)}
          required
        />

        <select
          value={selectedProgram ? selectedProgram.id : ''}
          onChange={handleProgramChange}
          required
        >
          <option value="">Select a Program</option>
          <option value="new" style={{ fontWeight: 'bold', color: 'green' }}>➕ Add New Program</option>
          {programs.map(program => (
            <option key={program.id} value={program.id}>{program.name}</option>
          ))}
        </select>

        {isNewProgram && (
          <div className="new-program-fields">
            <input
              type="text"
              placeholder="Enter New Program Name"
              value={newProgramName}
              onChange={(e) => setNewProgramName(e.target.value)}
              required
            />
            <textarea
              placeholder="Enter Program Description"
              value={newProgramDescription}
              onChange={(e) => setNewProgramDescription(e.target.value)}
              required
            />
            <button type="button" onClick={handleAddNewProgram}>Save New Program</button>
          </div>
        )}

        <button type="submit">📅 Book Appointment</button>
      </form>

      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default BookProgramPage;
