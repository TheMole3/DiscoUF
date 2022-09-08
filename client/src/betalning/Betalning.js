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
    const [code, setCode] = useState("");
    
    const [stage, setStage] = useState(0);

    const [privacyAccepted, setPrivacyAccepted] = useState(false);

    const [error, setError] = useState("");

    let checkData = (stage, newStage) => {

        if(stage === 0) {
            if(!children || !children.length) return setError("Du måste fylla i vilka som ska komma på discot")
            for (let i = 0; i < children.length; i++) {
                const child = children[i];
                if(!(child.name && child.surname && child.isLagstadie !== undefined && child.money)) return setError("Du måste fylla i alla uppgifter")
            }
        }

        if(stage === 1) {
            if(!(parentInfo.lastName && parentInfo.firstName && parentInfo.telephone)) return setError("Du måste fylla i alla uppgifter")
        }

        if(stage === 2) {
            if(!privacyAccepted) return setError("Du måste acceptera integritetspolicyn för att gå vidare")
        }
        
        setStage(newStage);
    }

    return false ? (
        <div style={styles.main}>
            {(() => {
                switch (stage) {
                    default:
                        return [
                            <button onClick={()=>{props.viewChange(false)}} style={{...styles.text, ...styles.backButton}}>←</button>,
                            <Children child={{children, setChildren}}/>,
                            <button onClick={()=>{checkData(0, 1)}} style={{...styles.text, ...styles.nextButton}}>Nästa steg</button>
                        ]
                    case 1:
                        return [
                            <button onClick={()=>{setStage(0)}} style={{...styles.text, ...styles.backButton}}>←</button>,
                            <Parent parentInfo={{parentInfo, setParentInfo}}/>,
                            <button onClick={()=>{checkData(1, 2)}} style={{...styles.text, ...styles.nextButton}}>Nästa steg</button>
                        ]
                    case 2:
                        return [
                            <button onClick={()=>{setStage(0)}} style={{...styles.text, ...styles.backButton}}>←</button>,
                            <Confirmation parentInfo={parentInfo} childInfo={children} privacyAccepted={{privacyAccepted, setPrivacyAccepted}}></Confirmation>,
                            <button onClick={()=>{checkData(2, 3)}} style={{...styles.text, ...styles.nextButton}}>Till betalning</button>
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
            {(() => {
                return error?(
                    <div style={styles.dim}>
                    <div style={styles.errorBox}>
                        <span style={styles.text}>{error}</span>
                        <button style={{...styles.text, ...styles.errorButton}} onClick={()=>{setError("")}}>Ok</button>
                    </div>
                    </div>
                ):(null)
            })()}
        </div>
    ): (
        <div style={styles.main}>
            <button onClick={()=>{props.viewChange(false)}} style={{...styles.text, ...styles.backButton}}>←</button>
            <div style={styles.childInfo}>
                <div style={styles.padding} />
                Swedbank har förlängda handlägningstider.<br/>
                Vi jobbar på att öppna förbetalningen så fort vi kan, kika gärna förbi om några dagar 😊
                <div style={styles.padding} />
            </div>
        </div>
    );
}

export default Betalning;
