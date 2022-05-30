import React, {useState} from "react";

import styles from "./betalningStyle"

function Parent(props) {
    let parentInfo = props.parentInfo.parentInfo;
    let setParentInfo = props.parentInfo.setParentInfo;


    return (
        <div style={{...styles.childMain, ...styles.text}}>

        </div>
    );
}

export default Parent;
