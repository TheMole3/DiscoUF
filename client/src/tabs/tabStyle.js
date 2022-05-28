import colors from "../colors";

export default {
    text: {
        fontFamily: "Oswald",
        fontWeight: 100,
        fontSize: "4.5vmin",
        letterSpacing: "0.1vmin",
    },
    bold: {
        fontWeight: 400,
    },
    semiBold: {
      fontWeight: 300
    },

    center: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },

    button: {
        backgroundColor: colors.secondary,
        color: "white",
        width: "30vw",
        height: "7vh",
        borderRadius: "8px",

        margin: "2vh",

        fontFamily: "Oswald",
        fontSize: "4.5vmin",

    },

    image: {
        width: "100%",
        borderRadius: "10px",
        filter: "drop-shadow(0px 0px 2px gray)",
    }

}