import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import ChildCentricSearch from './search/ChildCentricSearch'
import AdultCentricSearch from './search/AdultCentricSearch'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <button>Boknings läge</button><button>Barn läge</button>
    <AdultCentricSearch></AdultCentricSearch>
  </React.StrictMode>
);
