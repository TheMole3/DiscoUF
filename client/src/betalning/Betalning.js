import React, {useState} from "react";

import styles from "./betalningStyle"

import Children from "./Children"
import Parent from "./Parent"


function Betalning(props) {
    const [children, setChildren] = useState([]);
    const [parentInfo, setParentInfo] = useState({});

    const [stage, setStage] = useState(0);

    return (
        <div style={styles.main}>
            {(() => {
                switch (stage) {
                    case 0:
                        return [
                            <Children child={{children, setChildren}}/>,
                            <button onClick={()=>{setStage(1)}} style={{...styles.nextButton, ...styles.text}}>Nästa steg</button>
                        ]
                    case 1:
                        return [
                            <Parent parentInfo={{parentInfo, setParentInfo}}/>,
                            <button style={{...styles.nextButton, ...styles.text}}>Nästa steg</button>
                        ]
                }
                
            })()
            }   
        </div>
    );
}



export default Betalning;
