import React from "react";
import MiniSearch from 'minisearch'

import config from "../config";

import './search.css'

class SearchComponent extends React.Component {
    // Initializing constructor
    constructor() {
        super();
        this.state = {
            searchResult: [], // Filtered search result by minisearch query to display
            db: [], // The full db collection
            query: "",
            miniSearch: new MiniSearch({
                ...this.miniSearchConfig
            }),
        }
    }

    ///
    ///     DB functions
    ///

    /**
     * A middleware that changes the structure of DB entires before usage in search
     * @param {collection} db 
     * @returns A modified DB with appropriate entires
     */
    async dbMiddleware(db) {
        return db;
    }

    /**
     * Gets all available bookings and stores them in state and miniSearch
     */
    async dbUpdate() {
        // Get bookings by query
        fetch( config.apiUrl + "/searchBookings" )
            .then( response => response.json() )
            .then( async data => {
                let modifiedDB = await this.dbMiddleware(data);
                this.setState({ db: modifiedDB });
                await this.state.miniSearch.removeAll();
                await this.state.miniSearch.addAll(this.state.db)
                this.setState({searchResult: this.state.db})
            });
    }

    /**
     * Update DB on component mount
     */
    async componentDidMount() {
        this.dbUpdate();
    }


    ///
    ///     Search functions
    ///

    /**
     * Static config for miniSearch parameters
     */
    get miniSearchConfig() {
        return {
            idField: 'ID', // Use the 'ID' field as the unique id for bookings

            fields: ['ID', 'guardianName', 'guardianSurname', 'childName'], // Fields to index for full-text search
            storeFields:  ['guardianName', 'guardianSurname', 'ID', 'status', 'phone', 'children'], // Fields to keep and store in filtered results

            boost: {guardianName: 2, guardianSurname: 2}, // Fields that are boosted in search

            extractField: (document, fieldName) => { // Apply special conditions to some fields
                if(fieldName === 'childName') { 
                    return document['children'].map(a => a.name + " " + a.surname).join(" "); // Join 
                }
        
                return fieldName.split('.').reduce((doc, key) => doc && doc[key], document) // Other fieldNames
            }
        }
    }

    /**
     * Uses miniSearch to search for bookings by a query
     * @param {string} query 
     */
    async search(query) {
        let results = this.state.miniSearch.search(query, { prefix: true, fuzzy: 0.1, combineWith: "AND", boost: this.miniSearchConfig.boost })
        this.setState({searchResult: query?results:this.state.db, query: query})
    }


    ///
    ///     Render
    ///

    Entry = (props) => {
        let booking = props.data;

        let cost = booking.children.reduce((a,b) => a + parseInt(b.money), 0) + booking.children.length*20;

        return <li key={props.key} className="table-row">
            <div className="col col-1">
                <select style={{backgroundColor: booking.status==='paid'?'lightgreen':''}} onChange={e=>{}} value={booking.status}>
                    <option value="prel">Prel</option>
                    <option value="paid">Paid</option>
                    <option value="used">Used</option>
                </select>
            </div>
            <div className="col col-2">{booking.ID}</div>
            <div className="col col-3">{`${booking.guardianName} ${booking.guardianSurname}`}</div>
            <div className="col col-4">{booking.phone}</div>
            <div className="col col-5">{cost + " kr"}</div>
            <div className="col col-6">{booking.children.map((child, i, a) => `${child.name}${(a.length===i+1?"":", ")}`)}</div>
        </li>
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
            {this.state.searchResult.map((data) => this.Entry({key: data.ID, data: data}))}
        </ul>
        )
    }

}

export default SearchComponent