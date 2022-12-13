
const { Server } = require("socket.io");
const auth = require('./auth/auth'); // Import auth code
const manage = require("./manage");
const _ = require("lodash")

let getConvertedDB = async (manageServer) => {
    let DB = await manageServer.getBookings();
    let convertedDB = {};

    for(const booking of DB) {
        let newBooking = {
            "guardianName": booking.guardianName,
            "guardianSurname": booking.guardianSurname,
            "phone": booking.phone,
            "children": [],
            "paid": booking.paid,
            "ID": booking.ID
          };
        
        for(const child of booking.children) {
            newBooking.children.push({
                ...child,
            })
        }

        convertedDB[booking.ID] = newBooking;
    }

    return convertedDB;
}

const adminServer = async (httpServer, manageServer) => {
    io = new Server(httpServer, {
        cors: {
            origin: ["http://192.168.86.197:5173", "http://localhost:5173"],
            credentials: true,
        }
    });

    // Add login middleware
    //io.use(auth.jwt.socketIoMiddleware);


    let DB = await getConvertedDB(manageServer);
    let changes = {};
    let currentlyEditing = [];

    io.on("connection", (socket) => {
        console.log("connected")
        
        // Relay information from one client to the others
        socket.on("update", (data) => {
            changes = _.mergeWith(
                {}, changes, data,
                (a, b) => b === null ? a : undefined
            )
            socket.broadcast.emit("update", changes)
        })

        socket.on("getDB", (cb) => {
            cb(DB);

            socket.emit('update', changes);
        })


        // Broadcast when someone is editing something
        socket.on("editing", (bookingID) => {
            currentlyEditing.push({
                bookingID: bookingID,
                id: socket.user.id,
                name: socket.user.displayName
            });
            socket.broadcast.emit(currentlyEditing);
        })

        socket.on("stoppedEditing", (bookingID) => {
            currentlyEditing = currentlyEditing.filter(function( obj ) {
                return !(obj.bookingID == bookingID && id == socket.user.id) ;
            });
        })
    });

}

module.exports = adminServer;
