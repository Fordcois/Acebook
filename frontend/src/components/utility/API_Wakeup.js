import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import baseUrl from './baseURL';


const ApiWakeup = () => {
  const [serverStatus, setServerStatus] = useState(null);

  useEffect(() => {
    const PingAPI = async () => {
      try {
        const response = await fetch(`${baseUrl}/users/isserverlive`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) { throw new Error('Network response was not ok'); }
        const data = await response.json();
        console.log(data)
        setServerStatus(data.serverLive);
      } catch (error) {
        console.error('Error pinging the server:', error);
        setServerStatus('Error pinging the server');
      }
    };
    PingAPI();
  }, []);

  
  return (
    <div>
      {serverStatus === null && (
        <div className='BlackOutBackground'>
          <div className='ServerConnectPopUp' >
              <span className='title' style={{fontSize:'2rem'}}>Just A Moment...</span>
              <p style={{margin: '15px 10px'}}>This example page is hosted on the free tier of Render.com. The backend may spin down due to inactivity, so please wait while the server starts up.
              This may take a minute or so. </p>
              <span style={{ fontWeight: 'bold' }}>This message will disappear once the server has fully loaded.</span><br/> 
              <div className='LoadingContainer'>
                <div className='LoadingIcon'><FaUser /></div>
                <div className='LoadingIcon'><FaUser /></div>
                <div className='LoadingIcon'><FaUser /></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApiWakeup;