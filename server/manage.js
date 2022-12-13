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
                db[collection].find({ID: ID}, (err, docs) => { // Find entries with the ID
                    if(err) return reject(err); // Reject error

                    if(docs.length != 0) resolve(manager.createRandomID()); // Create a new ID if the generated one is used
                    else resolve(ID); // Return the valid ID
                })
            })
        },

        /*
            Get all bookings
        */
        getBookings: async () => {
            return await new Promise((resolve, reject) => {

                db.bookings.find({}, { _id:0 }, (err, docs) => {
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
                        "money": 70,
                        "entered": false
                    }
                ]
            }
        */
        addBooking: async (params) => {
            return await new Promise(async (resolve, reject) => {
                params.ID = await manager.createRandomID("bookings").catch(err => console.error);

                params.children.forEach((child, i) => {
                    params.children[i].childID = parseInt("" + params.ID + i)
                })

                db.bookings.insert(params, (err, docs) => {
                    if(err) return reject(err);
                    
                    resolve(params.ID);
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