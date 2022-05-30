import React, {useState} from "react";

import styles from "./betalningStyle"

function Children(props) {
    let children = props.child.children;
    let setChildren = props.child.setChildren;

    function handleChange(event) {
        let field = event.target.name.split("-");
        let newChildren = children;

        switch(field[0]) {
            case "firstname": 
                newChildren[field[1]].firstName = event.target.value;
            break;
            case "lastname": 
                newChildren[field[1]].lastName = event.target.value;
            break;
            case "radioLag": 
                newChildren[field[1]].isLagstadie = event.target.value=="on"?true:event.target.value=="off"?false:undefined;
            break;
            case "radioMellan": 
                newChildren[field[1]].isLagstadie = event.target.value=="on"?false:event.target.value=="off"?true:undefined;
            break;
            case "money": 
                newChildren[field[1]].money = event.target.value.replace(/\D/g,'');
            break;
            case "close":
                newChildren.splice(field[1], 1)
            break;
        }

        setChildren([...newChildren]);
    }

    return (
        <div style={{...styles.childMain, ...styles.text}}>
            {children.map((child, i) => {
                return (
                    <div style={styles.childInfo}>
                        <button style={styles.remove} onClick={handleChange} name={"close-" + i}>X</button>
                        <div style={styles.childRow}>
                            <input onChange={handleChange} value={child.firstName} name={"firstname-" + i} style={styles.childTextInput} placeholder="Förnamn"/>
                            <input onChange={handleChange} value={child.lastName} name={"lastname-" + i} style={styles.childTextInput}  placeholder="Efternamn"/>
                        </div>
                        <div style={styles.childRow}>
                            <div style={styles.radioContainer}>
                                <label>Lågstadie</label>
                                <input onChange={handleChange} checked={child.isLagstadie==undefined?false:child.isLagstadie} name={"radioLag-" + i} style={styles.radio}  type="radio"/>
                            </div>
                            <div style={styles.radioContainer}>
                                <label>Mellanstadie</label>
                                <input onChange={handleChange} checked={child.isLagstadie==undefined?false:!child.isLagstadie} name={"radioMellan-" + i} style={styles.radio}  type="radio"/>
                            </div>
                        </div>
                        <div  style={{...styles.radioContainer, ...styles.childRow}}>
                            <label>Hur mycket ska laddas på discokortet?</label>
                            <input onChange={handleChange} value={child.money} style={styles.childMoneyInput} name={"money-" + i} placeholder="- kr"/>
                        </div>
                    </div>
                )
            })}
            <button style={styles.addChildButton} onClick={() => {setChildren([...children, {}])}}>+</button>
            <label style={styles.addChildButtonLabel}>Lägg till ett barn</label>
        </div>
    );
}

export default Children;
