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
        marginTop: "2vh",

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
    },

    link: {
        lineHeight: "5vh",
        color: "blue",
        textDecoration: "underline",
        cursor: "pointer"
    }
}

function StartPage(props) {
  return (
    <div style={styles.content}>
        <p style={styles.question}>Vad är DISCO MELO?</p>
        <div style={styles.padding}></div>

        <div style={styles.info}>
            DISCO MELO är ett disco för låg- och mellanstadieelever som hålls på Curt Nicolin Gymnasiet i Finspång, anordnat av DISCO UF
        </div>

        <div style={styles.padding}></div>

        <div style={styles.info}>
            <span style={{color: "red"}}>OBS!</span> Om du vill minska kötiden kan du förboka! Läs mer under rubriken betalning
            <br/>
            <span onClick={()=> {
                props.viewChange(true);
            }} style={styles.link}>Till förbetalning</span>
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
                "Betalning": <Betalning viewChange={props.viewChange}/>,
                "Vilka är vi?": <Omoss/>,
                "Kontakt": <Kontakt/>
            }
        }/>
    </div>
  );
}



export default StartPage;
