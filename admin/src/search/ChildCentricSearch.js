import SearchComponent from './SearchComponent'


class ChildCentricSearch extends SearchComponent {

    /**
     * A middleware that changes the structure of DB entires before usage in search
     * @param {collection} db 
     * @returns A modified DB with appropriate entires
     */
    async dbMiddleware(db) {
        let newDB = []
        for(let x in db ) {
            let booking = db[x]
            for (let i in booking.children) {
                let child = booking.children[i]
                newDB.push({
                    childID: parseInt(booking.ID + "" + i),
                    ...child,
                    ...booking
                })
            }
        }

        return newDB
    }

    /**
     * Static config for miniSearch parameters
     */
    get miniSearchConfig() {
        return {
            idField: 'childID', // Use the 'ID' field as the unique id for bookings

            fields: ['ID', 'guardianName', 'guardianSurname', 'name', 'surname'], // Fields to index for full-text search
            storeFields:  ['name', 'surname', 'guardianName', 'guardianSurname', 'ID', 'childID', 'status', 'phone', 'children'], // Fields to keep and store in filtered results

            boost: {name: 2, surname: 2}, // Fields that are boosted in search

            extractField: (document, fieldName) => { // Apply special conditions to some fields
                if(fieldName === 'childName') { 
                    return document['children'].map(a => a.name + " " + a.surname).join(" "); // Join 
                }
        
                return fieldName.split('.').reduce((doc, key) => doc && doc[key], document) // Other fieldNames
            }
        }
    }

    Entry = (props) => {
        let booking = props.data;

        let cost = booking.children.reduce((a,b) => a + parseInt(b.money), 0) + booking.children.length*20;

        return <li key={props.key} className="table-row">
            <div className="col col-1">
                <select style={{backgroundColor: booking.status==='paid'?'lightgreen':''}} onChange={e=>{}} value={booking.status}>
                    <option value="prel">Prel</option>
                    <option value="paid">Paid</option>
                </select>
            </div>
            <div className="col col-2">{booking.ID}</div>
            <div className="col col-3">{`${booking.name} ${booking.surname}`}</div>
            <div className="col col-4">{cost + " kr"}</div>
            <div className="col col-3">{booking.phone}</div>
            <div className="col col-3">{`${booking.guardianName} ${booking.guardianSurname}`}</div>
        </li>
    }
    
    render() {
        return (
        <ul className="responsive-table">
            <i className="searchIcon fa fa-search"></i><input className="searchBox" value={this.state.query} onChange={e => this.search(e.target.value)}></input>
            <li className="table-header">
                <div className="col col-1">Status</div>
                <div className="col col-2">ID</div>
                <div className="col col-3">Barn</div>
                <div className="col col-4">Pengar</div>
                <div className="col col-3">Telefon</div>
                <div className="col col-3">Kontaktperson</div>
            </li>
            {this.state.searchResult.map((data) => this.Entry({key: data.childID, data: data}))}
        </ul>
        )
    }

}

export default ChildCentricSearch