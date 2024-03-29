import React from "react";

import styles from "./betalningStyle"

function Payment(props) {
    let parentInfo = props.parentInfo;
    let childInfo = props.childInfo;
    let code = props.code;

    let discoDue = childInfo.reduce((a,b) => a + parseInt(b.money), 0);
    let totalDue =(discoDue || 0) + childInfo.length*30;

    return [
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
                <b>Betala med swish</b>
                <br/>
                <p>OBS! Ange koden <b>{code}</b> i medelandet</p>
                <p>Swisha <i>{totalDue} kr</i>&nbsp; till nummret 123 672 98 75</p>
            </div>,
            <div style={styles.childInfo}>
                <p>Barnet hämtar ut sitt discokort i entrén genom att uppge sitt namn.</p>

                <b>Ställ er i förbetalningskön, den har öppet</b>
                <br/>
                Lågstadie: 17:00 - 17:20<br/>
                Mellanstadie: 19:45 - 20:05
            </div>      
    ];
}

export default Payment;
