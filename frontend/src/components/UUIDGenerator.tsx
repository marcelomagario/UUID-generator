import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config";
import "../styles/UUIDGenerator.css";
import copy from "copy-to-clipboard";
import '@fortawesome/fontawesome-free/css/all.min.css';

const UUIDGenerator: React.FC = () => {
  const [uuids, setUuids] = useState<string[]>([]);
  const [copiedUuids, setCopiedUuids] = useState<Set<string>>(new Set());

  const fetchUUIDs = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/uuids`);
      setUuids(response.data);
    } catch (error) {
      console.error("Error fetching UUIDs:", error);
    }
  };

  const handleCopy = (uuid: string) => {
    copy(uuid);
    setCopiedUuids(prevCopiedUuids => {
      const newCopiedUuids = new Set(prevCopiedUuids);
      newCopiedUuids.add(uuid);
      return newCopiedUuids;
    });
  };

  useEffect(() => {
    fetchUUIDs();
  }, []);

  return (
    <div className="main">
      <div className="container-left">
        <header className="header">
          <h1 className="title">Free UUID Generator</h1>
        </header>
        <ul className="uuid-list">
          {uuids.map((uuid, index) => (
            <li key={index} className="uuid-item">
              <span className={`uuid-text ${copiedUuids.has(uuid) ? 'copied' : ''}`}>{uuid}</span>
              <button className="copy-button" onClick={() => handleCopy(uuid)}>
                <i className="fas fa-copy"></i>
              </button>
            </li>
          ))}
        </ul>
        <button className="refresh-button" onClick={fetchUUIDs}>
          Refresh
        </button>

        <div className="warning">
          <p className="warning-font">While it is statistically improbable for our system to generate
          duplicate UUIDs, the UUIDs provided by this site come with no guarantees
          of uniqueness. We do not guarantee the uniqueness or reliability of the
          UUIDs. You are fully responsible for their use and assume all risks
          associated with them. By using the UUIDs from this site, you accept
          these terms. Avoid using UUIDs from cached versions of this page.
          </p>
          <p className="warning-font">Developed by Marcelo Magario - 2024
          </p>
        </div>
      </div>
      <div className="container-right">
        <img className="image" src="/images/img_01.png" alt="Design" />
      </div>
    </div>
  );
};

export default UUIDGenerator;
