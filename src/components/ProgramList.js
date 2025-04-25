import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ProgramList() {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/programs/')
      .then(response => setPrograms(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h2>Health Programs</h2>
      <ul>
        {programs.map(program => (
          <li key={program.id}>{program.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default ProgramList;
