import React from 'react';
import axios from 'axios';
import { API_URL } from '../config';
import '../styles/UUIDGenerator.css';


const UUIDGenerator: React.FC = () => {
  const [uuids, setUuids] = React.useState<string[]>([]);

  const fetchUUIDs = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/uuids`);
      setUuids(response.data);
    } catch (error) {
      console.error('Error fetching UUIDs:', error);
    }
  };

  React.useEffect(() => {
    fetchUUIDs();
  }, []);

  return (
    <div className='main'>
      <div className="container-left">
        <header className="header">
          <h1 className="title">Free UUID Generator</h1>
        </header>
        <ul className="uuid-list">
          {uuids.map((uuid, index) => (
            <li key={index} className="uuid-item">{uuid}</li>
          ))}
        </ul>
        <button className="refresh-button" onClick={fetchUUIDs}>Refresh</button>
      </div>
      <div className="container-right">
        <img className="image" src="/images/img_01.png" alt="Design" />
      </div>
    </div>
  );
};

export default UUIDGenerator;