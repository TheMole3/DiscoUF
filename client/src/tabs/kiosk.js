import styles from './tabStyle'

function kiosk() {
  return (
    <div style={styles.text}>
        I våra två kiosker kan du köpa all snacks och dryck du kan vilja ha under discot
        <br/>I kiosken används discokort för att betala, du kan läsa mer om det under rubriken, <span style={styles.semiBold}>Discokort</span>
        <br/><br/>Om du vill veta vad som finns i kiosken redan nu, kan du ladda ner prislistan genom att trycka på knappen
        <br/><div style={styles.center}><button style={styles.button}>Prislista</button></div>
    </div>
  );
}



export default kiosk;
