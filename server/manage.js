const config = require('./config.json');

const mongojs = require('mongojs')
, db = mongojs(config.dbConnect, ['bookings, contactInfo']); // Import database

db.contactInfo.find({},function (err, docs) {
	console.log(docs)
})

function ab (app) {
    
    let manager = {
        // Create a random ID that does not exist in DB
        createRandomID: async () => {
            return await new Promise((resolve, reject) => {
                let ID = Math.floor(1000 + Math.random() * 9000); // Generate a 4 digit number
                db.bookings.find({bookingID: ID}, (err, docs) => { // Find entries with the ID
                    if(err) return reject(err); // Reject error

                    if(docs.length != 0) resolve(manager.createRandomID()); // Create a new ID if the generated one is used
                    else resolve(ID); // Return the valid ID
                })
            })
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
                params.ID = await manager.createRandomID();
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
        updateContactInfo: async (params, id=undefined) => {
            return await new Promise(async (resolve, reject) => {

                if(id) { // If an id is supplied update the record

                    db.contactInfo.update(
                        {_id: id},
                        {$set: params},
                        (err, doc) => {
                            if(err) return reject(err);
                            resolve(doc);
                        }
                    )

                } else { // If no id is supplied create a new record

                    db.contactInfo.insert(
                        params,
                        (err, doc) => {
                            if(err) return reject(err);
                            resolve(doc);
                        }
                    )

                }
            })
        }
    }

    return manager;
}

module.exports = ab;

/*addBooking({
    "guardianName": "Emma",
    "guardianSurname": "Arnlund",
    "phone": "072 051 62 23",
    "children": [
        {
            "name": "Li",
            "surname": "Arnlund",
            "isLagstadie": false,
            "money": 70,
        }
    ]
})*/