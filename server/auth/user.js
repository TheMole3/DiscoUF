/* jshint esversion: 11 */
/* jshint laxcomma: true */

const config = require('../config.json');

const mongojs = require('mongojs')
    , db = mongojs(config.dbConnect, ['users']); // Import database

module.exports = {
    findOrCreate: (data, cb) => { // Find or create a user
        db.users.findAndModify({
            query: { id: data.uniqueId }, // Query for the user ID
            update: {
                $setOnInsert: {
                    provider: 'microsoft',
                    id: data.uniqueId,
                    tenantId: data.tenantId,
                    displayName: data.account.name,
                    email: data.account.username,
                    authLevel: 0,
                }
            },
            new: true,   // return new doc if one is upserted
            upsert: true // insert the document if it does not exist
        }, function(error, docs) {
            cb(error, docs);
        });
    },
    findById: (id, cb) => {
        db.users.findOne({id: id}, (error, user) => {
            cb(error, user);
        });
    }
};