import colors from './colors.js'

let styles = {
    noSelect: {
      WebkitTouchCallout: "none", /* iOS Safari */
      WebkitUserSelect: "none", /* Safari */
       KhtmlUserSelect: "none", /* Konqueror HTML */
         MozUserSelect: "none", /* Old versions of Firefox */
          MsUserSelect: "none", /* Internet Explorer/Edge */
              userSelect: "none",
    },
    navbar: {
        zIndex: "1000",
        position: "fixed",

        top: "5vh",

        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",

        width: "100vw",
        height: "12vmin",

        backgroundColor: colors.primary,

        filter: "drop-shadow(0px 2px 6px black)"
    },
    text: {
        margin: "0",
        fontFamily: "DiscoFont",
        fontSize: "20vmin",
        color: colors.secondary,
        filter: `drop-shadow(0px 0px 3px ${colors.dark})`
    },
    hamburger: {
        display: "flex",

        width: "6vh",
        height: "5vh",

        flexDirection: "column",
        justifyContent: "space-between",
        cursor: "pointer"

    },
    hamburgerSpan: {
        width: "6vh",
        height: ".9vh",

        backgroundColor: colors.dark,

        borderRadius: "0.4vh",
    }
}

function Navbar() {
  return (
    <div style={{...styles.navbar, ...styles.noSelect}} className="navbar">
        <p style={styles.text}>
          DISCO MELO
        </p>
    </div>
  );
}



export default Navbar;
