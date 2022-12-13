import React, {useState, useEffect} from 'react'

import config from './config.json' 

import './App.css';

function App() {

  const [DB, setDB] = useState([]);
  const [DBChanges, setDBChanges] = useState([])

  useEffect(() => {

    // Get DB
    fetch(config.url + "/searchBookings", {
      headers: {
        Cookie: 'auth'
      }
    })
    .then( response => response.json() )
    .then( async data => {
        let modifiedDB = [];

        for (let i = 0; i < data.length; i++) {
          const el = data[i];
          let a = el.ID; // Don't remove, it stops working
          modifiedDB[el.ID] = el; 
        }

        setDB(modifiedDB);
    });

  }, []);

  return (
    <span>Test</span>
  );
}

export default App;
