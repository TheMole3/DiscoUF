import colors from "../colors"

let styles = {
    main: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "5vh",
        paddingBottom: "5vh",
    },
    childMain: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    text: {
        fontFamily: "Oswald",
        fontWeight: 100,
        fontSize: "4.5vmin",
        letterSpacing: "0.1vmin",
    },
    addChildButton: {
        width: "13vmin",
        height: "13vmin",

        fontSize: "6vmin",
        fontWeight: 1000,
        fontFamily: "Arial",
        
        borderRadius: "50%",
        border: "none",
        filter: "drop-shadow(0px 0px 6px gray)",
    },
    
    remove: {
        borderRadius: "50%",
        border: "none",

        position: "absolute",
        right: "2.5vw",

        height: "5vw",
        width: "5vw",
        fontSize: "2.5vmin",

        cursor: "pointer",

        backgroundColor: "#ff9f9f"
    },

    title: {
        fontFamily: "Oswald"
    },
    
    childInfo: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",

        backgroundColor: "white",

        width: "80vw",

        padding: "2vw 5vw 2vw 5vw",
        marginBottom: "5vw",

        borderRadius: "10px",
        border: "1px solid #e1e1e1",
        filter: "drop-shadow(0px 0px 6px gray)",

        fontFamily: "Oswald",
        fontWeight: 100,
        fontSize: "4.5vmin",
        letterSpacing: "0.1vmin",
        textAlign: "center",
    },
    childRow: {
        width: "100%",

        paddingBottom: "2vh",
        paddingTop: "2vh",

        display: "flex",
        justifyContent: "space-around",
        
    },
    childTextInput: {
        width: "32vw",

        fontSize: "5vmin",
        textAlign: "center",

        border: "none",
        borderBottom: `1px solid ${colors.secondary}`
    },
    longTextInput: {
        width: "55vw",

        fontSize: "5vmin",
        textAlign: "center",

        border: "none",
        borderBottom: `1px solid ${colors.secondary}`
    },
    childMoneyInput: {
        width: "40vw",

        fontSize: "5vmin",
        textAlign: "center",

        border: "none",
        borderBottom: `1px solid ${colors.secondary}`
    },
    radioContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    radio: {
        minHeight: "4vmin",
        minWidth: "4vmin"
    },
    nextButton: {
        width: "50vw",
        height: "8vh",

        marginTop: "10vw",
        borderRadius: "10px",
    },
    backButton: {
        zIndex: 1000,
        top: "2vh",
        left: "3vw",

        position: "fixed",

        opacity: "80%",

        lineHeight: "1vw",

        width: "8vw",
        height: "6vw",

        fontFamily: "Arial",

        marginTop: "10vw",
        borderRadius: "1vmin",
    },

    paymentTable: {
        width: "100%",

        textAlign: "left",
    },

    padding: {
        height: "3vh"
    },

    dim: {
        position: "fixed",
        top: "-50vh",
        width: "100vw",
        height: "200vh",
        backgroundColor: "rgba(200, 200, 200, 0.2)",
        backdropFilter: "blur(3px)",
    },

    errorBox: {
        position: "fixed",
        top: "80vh",
        left: "10vw",
        width: "70vw",
        minHeight: "10vh",
        padding: "5vw",
        paddingBottom: "5vh",
        backgroundColor: "rgb(233, 161, 226)",
        borderRadius: "2vmin",
        textAlign: "center",
        filter: "drop-shadow(0px 0px 6px gray)",
    },

    errorButton: {
        position: "absolute",
        height: "5vh",
        width: "40%",
        bottom: "16%",
        left: "30%",
    },

    integrity: {
        fontSize: "3.7vmin",
    }
}

export default styles