import React from "react";
import MiniSearch from 'minisearch'

import config from "./config";

import './search.css'

/**
 * TODO
 * separate components a bit more
 * Add booking view window with edit functionality
 * Add child centric viewing, for entry
 * Add contact info search
 */


/**
 * A component where you can search for bookings
 */

class Entry extends React.Component {
    constructor(props) {
        super();
        this.state = {data: props.data};
    }

    render() {
        let booking = this.state.data;

        let cost = booking.children.reduce((a,b) => a + parseInt(b.money), 0) + booking.children.length*20;

        return <li className="table-row">
            <div className="col col-1">
                <select style={{backgroundColor: booking.status==='paid'?'lightgreen':''}} onChange={e=>{}} value={booking.status}>
                    <option value="prel">Prel</option>
                    <option value="paid">Paid</option>
                </select>
            </div>
            <div className="col col-2">{booking.ID}</div>
            <div className="col col-3">{`${booking.guardianName} ${booking.guardianSurname}`}</div>
            <div className="col col-4">{booking.phone}</div>
            <div className="col col-5">{cost + " kr"}</div>
            <div className="col col-6">{booking.children.map((child, i, a) => `${child.name}${(a.length===i+1?"":", ")}`)}</div>
        </li>
    }
}

let miniSearch = new MiniSearch({
    idField: 'ID',
    fields: ['ID', 'guardianName', 'guardianSurname', 'childName'], // fields to index for full-text search
    storeFields: ['guardianName', 'guardianSurname', 'ID', 'status', 'phone', 'children'],
    extractField: (document, fieldName) => {
        if(fieldName === 'childName') {
            return document['children'].map(a => a.name + " " + a.surname).join(" ");
        }

        return fieldName.split('.').reduce((doc, key) => doc && doc[key], document)
    }
})

class Search extends React.Component {
    constructor(props) {
        super();
        this.state = {
            collection: props.collection,
            query: "",
            searchResult: [],
            db: [],
        }
    }

    dbUpdate() {
        // Get bookings by query
        fetch( config.apiUrl + "/searchBookings?query=" + this.state.query )
            .then( response => response.json() )
            .then( async data => {
                this.setState({ db: data }) 
                await miniSearch.removeAll();
                await miniSearch.addAll(this.state.db)
                this.setState({searchResult: this.state.db})
            });
    }

    async componentDidMount() {
        this.dbUpdate();
    }

    async search(query) {
        let results = miniSearch.search(query, { prefix: true, fuzzy: 0.1, combineWith: "AND", boost: {guardianName: 2, guardianSurname: 2} })

        this.setState({searchResult: query?results:this.state.db, query: query})
    }

    render() {
        return (
        <ul className="responsive-table">
            <i className="searchIcon fa fa-search"></i><input className="searchBox" value={this.state.query} onChange={e => this.search(e.target.value)}></input>
            <li className="table-header">
                <div className="col col-1">Status</div>
                <div className="col col-2">ID</div>
                <div className="col col-3">Kontaktperson</div>
                <div className="col col-4">Telefon</div>
                <div className="col col-5">Att betala</div>
                <div className="col col-6">Barn</div>
            </li>
            {this.state.searchResult.map((data) => <Entry key={data.ID} data={data}></Entry>)}
        </ul>
        )
    }
}

export default Search