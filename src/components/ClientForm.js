import React, { useState } from 'react';
import axios from 'axios';

function ClientForm() {
  const [name, setName] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('http://127.0.0.1:8000/clients/', { name })
      .then(response => {
        alert('Client added!');
        setName('');
      })
      .catch(error => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Client Name"
        required
      />
      <button type="submit">Add Client</button>
    </form>
  );
}

export default ClientForm;
