import colors from './colors.js'

import TabList from './TabList.js';

import Lagstadiedisco from './tabs/lagstadiedisco'
import Mellanstadiedisco from './tabs/mellanstadiedisco'
import Kiosk from './tabs/kiosk'
import Forbattringar from './tabs/forbattringar'
import Omoss from './tabs/omoss'
import Kontakt from './tabs/kontakt'
import Betalning from './tabs/betalning'
import Foraldrar from './tabs/foraldrar'
import Discokort from './tabs/discokort'


let styles = {
    content: {
        marginTop: "3vh",

        display: "flex",
        flexDirection: "column",

        alignItems: "center"
    },
    question: {
        margin: "0",
        fontSize: "7vmin",

        fontFamily: "Oswald",
        color: colors.dark,
        
        padding: "0px 2vw 0px 2vw",
        borderBottom: `3px solid ${colors.secondary}`
    },

    info: {
        backgroundColor: "white",

        width: "80vw",

        padding: "5vw",

        borderRadius: "10px",
        border: "1px solid #e1e1e1",
        paddingBottom: "-10px",
        filter: "drop-shadow(0px 0px 6px gray)",

        fontFamily: "Oswald",
        fontWeight: 100,
        fontSize: "4.5vmin",
        letterSpacing: "0.1vmin"
    },

    padding: {
        height: "3vh"
    }
}

function StartPage() {
  return (
    <div style={styles.content}>
        <p style={styles.question}>Vad är DISCO FRISKO?</p>
        <div style={styles.padding}></div>

        <div style={styles.info}>
            DISCO FRISKO är ett disco för låg- och mellanstadieelever som hålls på Curt Nicolin Gymnasiet i Finspång, anordnat av DISCO UF
            <br/><br/>
            <span style={{color: "red"}}>OBS!</span> Om du vill minska kötiden kan du förboka! Läs mer under rubriken betalning
        </div>

        <div style={styles.padding}></div>

        <TabList content={
            {
                "Lågstadiedisco": <Lagstadiedisco/>,
                "Mellanstadiedisco": <Mellanstadiedisco/>,
                "Kiosken": <Kiosk/>,
                "Discokort": <Discokort/>,
                "Vad har vi förbättrat?": <Forbattringar/>,
                "Föräldrar": <Foraldrar/>,
                "Betalning": <Betalning/>,
                "Vilka är vi?": <Omoss/>,
                "Kontakt": <Kontakt/>
            }
        }/>
    </div>
  );
}



export default StartPage;
