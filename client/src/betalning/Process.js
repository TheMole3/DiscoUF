import React, {useState} from "react";

import styles from "./betalningStyle"


class Payment extends React.Component {
    constructor(props) {
        super(props);
        let parentInfo = props.parentInfo;
        let childInfo = props.childInfo;
        let setCode = props.code.setCode;

        this.state = {dots: ".", error: undefined};
        
        let jsonData = {
            "guardianName": parentInfo.firstName,
            "guardianSurname": parentInfo.lastName,
            "phone": parentInfo.phone,
            "children": childInfo
        }

        fetch('http://localhost:3010/addBooking', {  // Enter your IP address here

            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData) // body data type must match "Content-Type" header

        }).then((response) => response.json())
        .then((data) => {
            setCode(data.ID)
            props.setStage(3)
        })
        .catch((error) => {
            this.setState({...this.state, error: <div style={{...styles.childInfo}}>
                <div style={styles.padding}></div>
                NÅGOT GICK SNETT!
                <div style={styles.padding}></div>
                <b>ERROR:</b>
                {error.message}
                <div style={styles.padding}></div>
                Försök igen eller kontakta hugo@melo.se
                <div style={styles.padding}></div>
            </div>})
        });

        
        setInterval(() => {
            this.setState({...this.state, dots: this.state.dots + "."})

            if(this.state.dots.length >= 4) this.setState({...this.state, dots: "."})
        }, 800)
    }
    
    render() {
        if(this.state.error) return this.state.error

        return [
            <div style={styles.childInfo}>
                <div style={styles.padding}></div>
                Verifierar bokning{this.state.dots}
                <div style={styles.padding}></div>
            </div>
            
        ];
    }
}

export default Payment;
