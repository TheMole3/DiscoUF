import { readable, writable, derived } from 'svelte/store';
import _ from 'lodash';

import * as config from '../routes/config.json'

import { socket } from './socket';

let OGDB;

let convertDB = (a, b={}) => {

    let db = _.mergeWith(
        {}, a, b,
        (a, b) => b === null ? a : undefined
    )


    for(const booking in db) {    
        for(const child in db[booking].children) {
            db[booking].children[child].booking = db[booking];
        }   
    }

    return db;
}

const localDB = writable([], function start(set) {
    socket.emit("getDB", (DB) => {
        OGDB = DB
        set(convertDB(OGDB))
    })
});


let updates = {}
export const update = (data) => {
    updates = _.mergeWith(
        {}, updates, data,
        (a, b) => b === null ? a : undefined
    )

    localDB.set(convertDB(OGDB, updates))
    socket.emit("update", data)
}

socket.on("update", (changes) => {
    updates = _.mergeWith(
        {}, updates, changes,
        (a, b) => b === null ? a : undefined
    )
    localDB.set(convertDB(OGDB, updates))
})


export const DB = derived(localDB, $localDB => $localDB)
