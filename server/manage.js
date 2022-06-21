const config = require('./config.json');

const mongojs = require('mongojs')
, ObjectId = require('mongojs').ObjectId
, db = mongojs(config.dbConnect, ['bookings, contactInfo']); // Import database

function manage (app) {
    
    let manager = {
        // Create a random ID that does not exist in DB, specify which collection that should be used
        createRandomID: async (collection) => {
            return await new Promise((resolve, reject) => {
                let ID = Math.floor(1000 + Math.random() * 9000); // Generate a 4 digit number
                db[collection].find({bookingID: ID}, (err, docs) => { // Find entries with the ID
                    if(err) return reject(err); // Reject error

                    if(docs.length != 0) resolve(manager.createRandomID()); // Create a new ID if the generated one is used
                    else resolve(ID); // Return the valid ID
                })
            })
        },

        /*
            Get bookings by a search query
        */
        searchBooking: async (query) => {
            return await new Promise((resolve, reject) => {
                query = query.split(" ").filter((a) => a).join("|");

                db.bookings.find({
                    $or: [
                        { "guardianName" : {$regex : query, $options: "i" } }, 
                        { "guardianSurname" : {$regex : query, $options: "i" } },
                        { "children.name" : {$regex : query, $options: "i" } },
                        { "children.surname" : {$regex : query, $options: "i" } },
                        { "ID" : parseInt(query.replace(/\D/g, "")) },
                    ]
                }, { _id:0 }, (err, docs) => {
                    if(err) return reject(err);
                    resolve(docs);
                });
            });
        },

        /*
            Adds a booking to the system and returns the ID

            params {
                "guardianName": "Brittmarie"
                "guardianSurname": "Karlsson"
                "phone": "072 051 62 23"
                "children": [
                    {
                        "name": "Olle"
                        "surname": "Karlsson"
                        "isLagstadie": true
                        "money": 70
                    }
                ]
            }
        */
        addBooking: async (params) => {
            return await new Promise(async (resolve, reject) => {
                params.ID = await manager.createRandomID("bookings").catch(err => console.error);
                params.status = 'prel';

                db.bookings.insert(params, (err, docs) => {
                    if(err) return reject(err);
                    
                    resolve(params.ID);
                })

                manager.updateContactInfo({
                    guardianName: params.guardianName + " " + params.guardianSurname,
                    children: params.children.map(a => a.name + " " + a.surname),
                    phone: params.phone,
                    otherInfo: "",
                    paymentReference: params.ID,
                })
                
            })
        },

        /*
            Updates or creates a booking

            params {
                ID: 9483
                "guardianName": "Brittmarie"
                "guardianSurname": "Karlsson"
                "phone": "072 051 62 23"
                "children": [
                    {
                        "name": "Olle"
                        "surname": "Karlsson"
                        "isLagstadie": true
                        "money": 70
                    }
                ]
            }

        */
        updateBooking: async (params) => {
            return await new Promise(async (resolve, reject) => {
                if(params == {}) return resolve("{}"); // If there are no params, ignore

                if(params.ID) { // If an id is supplied update the record

                    db.bookings.update(
                        {ID: params.ID},
                        {$set: params},
                        (err, doc) => {
                            if(err) return reject(err);
                            resolve(200);
                        }
                    )

                } else { // If no id is supplied create a new record
                    params.ID = await manager.createRandomID("bookings").catch(err => console.error);
                    db.bookings.insert(
                        params,
                        (err, doc) => {
                            if(err) return reject(err);
                            resolve(200);
                        }
                    )

                }
            })
        },

        /*
            Deletes a booking

            ID = 9432
        */
        deleteBooking: async (ID) => {
            return await new Promise(async (resolve, reject) => {
                db.bookings.update({ID: ID}, {$set: {status: 'deleted'}}, (err, docs) => {
                    if(err) return reject(err);
                    resolve(200);
                })
            })
        },

        /*
            Updates or creates a contact info record

            params {
                guardianName: "Brittmarie Karlsson"
                children: ["Olle Karlsson", "Lina Karlsson"]
                phone: "072 051 62 23"
                otherInfo: "Olle is allergic to nuts"
                paymentReference: int ID
            }

            id, a booking id
        */
        updateContactInfo: async (params) => {
            return await new Promise(async (resolve, reject) => {
                if(params == {}) return resolve("{}"); // If there are no params, ignore

                if(params.ID) { // If an id is supplied update the record

                    db.contactInfo.update(
                        {ID: params.ID},
                        {$set: params},
                        (err, doc) => {
                            if(err) return reject(err);
                            resolve(200);
                        }
                    )

                } else { // If no id is supplied create a new record
                    params.ID = await manager.createRandomID("contactInfo").catch(err => console.error);
                    db.contactInfo.insert(
                        params,
                        (err, doc) => {
                            if(err) return reject(err);
                            resolve(200);
                        }
                    )

                }
            })
        },

        /*
            Deletes a contact info record

            ID = 9432
        */
        deleteContactInfo: async (ID) => {
            return await new Promise(async (resolve, reject) => {
                db.contactInfo.delete({ID: ID}, (err, docs) => {
                    if(err) return reject(err);
                    resolve(200);
                })
            })
        },
    }

    return manager;
}

module.exports = manage;

/*manage().addBooking({
    "guardianName": "Jonas",
    "guardianSurname": "Harnlund",
    "phone": "072 051 62 23",
    "children": [
        {
            "name": "Limpan",
            "surname": "Harnlund",
            "isLagstadie": false,
            "money": 70,
        }
    ]
})*/