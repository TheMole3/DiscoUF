import React, {useState} from "react";

import colors from './colors.js'

let styles = {
    container: {
        overflow: "hidden",

        borderRadius: "10px",

        border: "1px solid #e1e1e1",

        marginBottom: "5vh",

        filter: "drop-shadow(0px 0px 6px gray)",

        fontFamily: "Oswald",
    },
    tab: {
        display: "flex",
        flexDirection: "column",

        width: "80vw",

        paddingLeft: "5vw",
        paddingRight: "5vw",

        backgroundColor: "#ffff",
        fontWeight: "400",
        fontSize: "5vmin",

        borderBottom: "1px solid #e1e1e1",

    },
    lasttab: {
        borderBottom: "none"
    },
    expandArrow: {
        position: "absolute",
        right: "10vw",

        width: 0,
        height: 0,
        borderLeft: "2vw solid transparent",
        borderRight: "2vw solid transparent",
        
        borderTop: `2vw solid ${colors.dark}`,
    },
    contractArrow: {
        position: "absolute",
        right: "10vw",

        width: 0,
        height: 0,
        borderLeft: "2vw solid transparent",
        borderRight: "2vw solid transparent",
        
        borderBottom: `2vw solid ${colors.dark}`,
    },

    tabTitle: {
        display: "flex",
        alignItems: "center",

        height: "7vh",
        cursor: "pointer",
    },

    tabContent: {
        paddingBottom: "5vh",
    }
}

function TabList(props) {
    const [selectedTab, setSelectedTab] = useState(null);
    
    let tabSelect = (i) => {
        setSelectedTab(i==selectedTab?null:i)
    }

    const tabs = props.content
    const tabItems = Object.keys(tabs).map((title, i) => (
        <div key={i} style={{...styles.tab, ...Object.keys(tabs).length-1==i?styles.lasttab:{}}}>
            <div onClick={()=>{tabSelect(i)}} style={styles.tabTitle}>
                {title}
                <div style={selectedTab==i?styles.contractArrow:styles.expandArrow}></div>
            </div>           
            {selectedTab==i?
            <div style={styles.tabContent}>
                {tabs[title]}
            </div>
            :""}
        </div>
    ));

    return (
        <div style={styles.container}>
            {tabItems}
        </div>
    );
}



export default TabList;
