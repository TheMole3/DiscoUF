import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import ChildCentricSearch from './search/ChildCentricSearch'
import AdultCentricSearch from './search/AdultCentricSearch'
import ModifyBooking from './ModifyBooking'


class Index extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      mode: "child",
      selectedBooking: {
        "guardianName": "Jonas",
        "guardianSurname": "Arnlund",
        "phone": "072 051 62 23",
        "children": [
          {
            "name": "Emma",
            "surname": "Arnlund",
            "isLagstadie": false,
            "money": "70"
          },
          {
            "name": "Hugo",
            "surname": "Arnlund",
            "isLagstadie": true,
            "money": "30"
          }
        ],
        "ID": 3865,
        "status": "prel"
      }
    }
  }

  render() {
    return (
      <React.StrictMode>
        <button onClick={() => {this.setState({...this.state, mode: this.state.mode==="adult"?"child":"adult"})}}>
        { this.state.mode==="adult"?"Till barn läge":"Till vuxen läge" }
        </button>

        { this.state.mode==="adult"?<AdultCentricSearch/>:<ChildCentricSearch/> }

        <ModifyBooking selectedBooking={this.state.selectedBooking}/>
      </React.StrictMode>
    )
  }
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Index></Index>);
