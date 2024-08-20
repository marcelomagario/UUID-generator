import React from 'react';
import axios from 'axios';

const UUIDGenerator: React.FC = () => {
  const [uuids, setUuids] = React.useState<string[]>([]);

  const fetchUUIDs = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/uuids');
      setUuids(response.data);
    } catch (error) {
      console.error('Error fetching UUIDs:', error);
    }
  };

  React.useEffect(() => {
    fetchUUIDs();
  }, []);

  return (
    <div>
      <h1>Free UUID Generator</h1>
      <button onClick={fetchUUIDs}>Refresh</button>
      <ul>
        {uuids.map((uuid, index) => (
          <li key={index}>{uuid}</li>
        ))}
      </ul>
    </div>
  );
};

export default UUIDGenerator;