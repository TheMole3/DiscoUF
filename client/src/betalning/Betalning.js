import React, {useState} from "react";

import styles from "./betalningStyle"

import Children from "./Children"
import Parent from "./Parent"
import Payment from "./Payment"
import Process from "./Process"
import Confirmation from "./Confirmation"

function Betalning(props) {
    const [children, setChildren] = useState([]);
    const [parentInfo, setParentInfo] = useState({
        firstName:"",
        lastName:"",
        telephone:"",
        email:""
    });
    const [code, setCode] = useState("")

    const [stage, setStage] = useState(0);

    return (
        <div style={styles.main}>
            {(() => {
                switch (stage) {
                    case 0:
                        return [
                            <button onClick={()=>{props.viewChange(false)}} style={{...styles.text, ...styles.backButton}}>←</button>,
                            <Children child={{children, setChildren}}/>,
                            <button onClick={()=>{setStage(1)}} style={{...styles.text, ...styles.nextButton}}>Nästa steg</button>
                        ]
                    case 1:
                        return [
                            <button onClick={()=>{setStage(0)}} style={{...styles.text, ...styles.backButton}}>←</button>,
                            <Parent parentInfo={{parentInfo, setParentInfo}}/>,
                            <button onClick={()=>{setStage(2)}} style={{...styles.text, ...styles.nextButton}}>Nästa steg</button>
                        ]
                    case 2:
                        return [
                            <button onClick={()=>{setStage(0)}} style={{...styles.text, ...styles.backButton}}>←</button>,
                            <Confirmation parentInfo={parentInfo} childInfo={children}></Confirmation>,
                            <button onClick={()=>{setStage(3)}} style={{...styles.text, ...styles.nextButton}}>Till betalning</button>
                        ]
                    case 3:
                        return [
                            <Process parentInfo={parentInfo} childInfo={children} code={{code, setCode}} viewChange={props.viewChange} setStage={setStage}/>,
                        ]
                    case 4:
                        return [
                            <Payment parentInfo={parentInfo} childInfo={children} code={48932}/>,
                            <button onClick={()=>{props.viewChange(false)}} style={{...styles.text, ...styles.nextButton}}>Tillbaka till startsidan</button>
                        ]
                }
            })()}   
        </div>
    );
}

export default Betalning;
