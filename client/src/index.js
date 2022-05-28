import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import colors from './colors.js'

import Navbar from './Navbar'
import StartPage from './StartPage'

let styles = {
  main: {
    display: "flex",
    flexDirection: "column",
    margin: 0,

    paddingTop: "14vh",

    width: "100vw",

    minHeight: "calc(100vh - 14vh)",
    height: "100%",

    backgroundColor: colors.light
  },
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div style={styles.main}>
      <Navbar/>
      <StartPage/>
    </div>
  </React.StrictMode>
);


