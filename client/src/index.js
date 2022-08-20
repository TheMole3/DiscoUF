import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import colors from './colors.js'

import Navbar from './Navbar'
import StartPage from './StartPage'

import Betalning from './betalning/Betalning'


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

function Index() {
  const [payment, startPayment] = useState(false);

  if(payment) {
    return (
      <div style={styles.main}>
        <Navbar/>
        <Betalning viewChange={startPayment}/>
      </div>
    )    
  } else {
    return (
      <div style={styles.main}>
        <Navbar/>
        <StartPage viewChange={startPayment}/>
      </div>
    )
  }  
} 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Index></Index>);


