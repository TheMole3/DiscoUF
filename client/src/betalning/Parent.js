import React, {useState} from "react";

import styles from "./betalningStyle"

function Parent(props) {
    let parentInfo = props.parentInfo.parentInfo;
    let setParentInfo = props.parentInfo.setParentInfo;

    let handleChange = (event) => {
        let field = event.target.name
        let newParentInfo = parentInfo;

        switch(field) {
            case "firstname": 
                newParentInfo.firstName = event.target.value;
            break;
            case "lastname": 
                newParentInfo.lastName = event.target.value;
            break;
            case "phone": 
                newParentInfo.phone = event.target.value.replace(/[^(0-9| )]/g,'');
            break;
            case "email": 
                newParentInfo.email = event.target.value;
            break;
        }

        setParentInfo({...newParentInfo});
    }

    return (
            <div style={styles.childInfo}>
                <span>Barnens kontaktperson</span>
                <div style={styles.childRow}>
                    <input onChange={handleChange} value={parentInfo.firstName} name={"firstname"} style={styles.childTextInput} placeholder="Förnamn"/>
                    <input onChange={handleChange} value={parentInfo.lastName} name={"lastname"} style={styles.childTextInput}  placeholder="Efternamn"/>
                </div>
                <div  style={{...styles.radioContainer, ...styles.childRow}}>
                    <label>Telefonnummer</label>
                    <input onChange={handleChange} value={parentInfo.phone} name={"phone"} style={styles.longTextInput}  placeholder="123 456 78 90"/>
                </div>
            </div>
    );
}

export default Parent;
