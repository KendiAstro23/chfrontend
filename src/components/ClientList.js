import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ClientList() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/clients/')
      .then(response => setClients(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h2>Clients</h2>
      <ul>
        {clients.map(client => (
          <li key={client.id}>{client.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default ClientList;
