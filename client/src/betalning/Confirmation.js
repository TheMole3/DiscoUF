import React from "react";

import styles from "./betalningStyle"
import privacyPolicy from "../privacy";

function Payment(props) {
    let childInfo = props.childInfo;

    let discoDue = childInfo.reduce((a,b) => a + parseInt(b.money), 0);
    let totalDue =(discoDue || 0) + childInfo.length*30;

    return [
            <h1 style={styles.title}>Ordervy</h1>,
            <div style={styles.childInfo}>
                <table style={styles.paymentTable}>
                    <tr>
                        <th>Produkt</th>
                        <th>Mängd</th>
                        <th>Á pris</th>
                    </tr>
                    <tr>
                        <td>Inträde</td>
                        <td>{childInfo.length}x</td>
                        <td>30 kr</td>
                    </tr>
                    {childInfo.map((child, i) => {
                        return (
                        <tr>
                            <td>Discokort</td>
                            <td>1x</td>
                            <td>{child.money} kr</td>
                        </tr>
                        )
                    })}
                    <tr><td><br/></td></tr>
                    <tr>
                        <td></td>
                        <td><b>Total</b></td>
                        <td>{totalDue} kr</td>
                    </tr>
                </table> 
            </div>,
            <div style={styles.childInfo}>
                <p>Barnet hämtar ut sitt discokort i entrén genom att uppge sitt namn.</p>

                <b>Ställ er i förbetalningskön, den har öppet</b>
                <br/>
                Lågstadie: 17:00 - 17:20<br/>
                Mellanstadie: 19:45 - 20:05
            </div>,  
            <div>
                <input checked={props.privacyAccepted.privacyAccepted} onClick={(event) => {props.privacyAccepted.setPrivacyAccepted(event.target.checked)}} type="checkbox"/>Jag har läst och accepterar <a onClick={(e) => {
                    e.preventDefault();
                    document.open();
                    window.history.pushState({place: "privacy"}, '', "/")
                    document.write(privacyPolicy);
                    document.close();
                }} href="/">integritetspolicyn</a>
            </div>  
    ];
}

export default Payment;
