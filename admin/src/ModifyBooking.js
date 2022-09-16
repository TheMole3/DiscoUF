import React from 'react';

import './modifyBooking.css'


class ModifyBooking extends React.Component {
    constructor(props) {
        super(props)
        this.state = {};

        this.state.selectedBooking = props.selectedBooking;

    }

    render() {
        let sb = this.state.selectedBooking

        return (
            <div className="container">
                <span className='ID'>ID: {sb.ID}</span>
                <ul className="list">
                    <li>Kontaktperson: <input className='nameInput' value={sb.guardianName}/> <input className='nameInput' value={sb.guardianSurname}/></li>
                    <li>Telefon: <input className="phoneInput" value={sb.phone}/></li>
                    <br/><br/>
                    {
                        sb.children.map((child) => {
                            return (
                                <li>
                                    <input className='nameInput' value={child.name}/> <input className='nameInput' value={child.surname}/>
                                    <br/>
                                    <input className='moneyInput' type="number" value={child.money}/> Kr
                                    <br/>
                                    Lågstadie: <input type="radio" checked={child.isLagstadie}/>
                                    <br/>Mellanstadie: <input type="radio" checked={!child.isLagstadie}/>
                                    <br/><br/><br/>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default ModifyBooking;