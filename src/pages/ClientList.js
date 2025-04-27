import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ClientPages.css';

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState('');

  const fetchClients = () => {
    axios.get('https://cema-health-1g0x.onrender.com/clients/')
      .then(res => setClients(res.data))
      .catch(err => console.error('Error fetching clients:', err));
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const filteredClients = clients.filter(client =>
    client.name && client.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="client-list">
      <h1>Registered Clients</h1>
      <input
        type="text"
        placeholder="Search by name..."
        autoComplete="off"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Optional manual refresh button */}
      {/* <button onClick={fetchClients}>🔄 Refresh List</button> */}

      <ul>
        {filteredClients.map(client => (
          <li key={client.id} className="client-item">
            {client.image_url && (
              <img src={`https://cema-health-1g0x.onrender.com${client.image_url}`} alt={client.name} className="client-img" />
            )}
            <div className="client-info">
              <span>{client.name}</span>
              <Link to={`/clients/${client.id}`} className="view-profile-btn">View Profile</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientList;
