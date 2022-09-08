import styles from './tabStyle'

function betalning(props) {
  return (
    <div style={styles.text}>
        Inträdet till discot är <span style={styles.bold}>30 kr</span>
        <br/>Sen laddar du också ett discokort med pengar för köp i kiosken, mer om discokort går att läsa under rubriken <span style={styles.semiBold}>Discokort</span>
    
        <br/><br/>Det finns flera sätt att betala, nytt för detta disco är <span style={styles.semiBold}>förbetalning</span>. Om du förbetalar får du till och med en egen kö in till discot, barnet uppger bara sitt namn så får man komma in med sitt discokort i handen.
        <br/><br/>
        <div style={styles.center}><br/>Tryck på knappen för att komma till förbetalningen
        <br/><button onClick={()=> {
          props.viewChange(true);
        }} style={styles.button}>Förbetalning</button></div>

        <br/>Det går också att betala när du väl är på plats. 
        <br/>Vi tar helst swish, men även kontanter.
    
    </div>
  );
}



export default betalning;
