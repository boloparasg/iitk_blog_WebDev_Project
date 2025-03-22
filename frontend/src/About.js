// src/About.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useUser from './utils/getUser';
function About() {
  const [message, setMessage] = useState('');
  
  const user = useUser();
  // useEffect(() => {
  //   axios.get('/api/about')
  //     .then(response => setMessage(response.data.message))
  //     .catch(error => console.error('Error fetching data:', error));
  // }, []);

  return (
    <div>
      <h1>About Page</h1>
      <p>{message}</p>
    </div>
  );
}

export default About;
