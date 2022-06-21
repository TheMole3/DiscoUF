const express = require('express');
const app =   express()
            , cookieParser = require('cookie-parser')
            , bodyParser = require('body-parser')


const config = require('./config.json');
const port = config.port;

app.use(cookieParser());  // Use cookie parser
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit:5000}));
app.use(express.json()); // Use express JSON

const auth = require('./auth/auth'); // Import auth code
app.use(auth.jwt.authenticateToken); // Use middleware for auth token

let manageServer = require("./manage")(app);

/*
Public endpoints

POST /addBooking
An endpoint for users to add their booking to the system,
returns a reference code that should be supplied in the

Private endpoints

GET /getBookingById
Get a booking by a parameter

GET /getBookings
Get all bookings

POST /editBooking
Edit booking parameters by id

DELETE /deleteBooking
Delete booking by id
*/

/* 
    PUBLIC ENDPOINTS 
*/
app.get('/', (req, res) => {
    if(!req.user) return res.redirect('/ads');
    res.send(req.user)
})

app.post('/addBooking', async (req, res) => {
    let booking = {
        "guardianName": req.body.guardianName,
        "guardianSurname": req.body.guardianSurname,
        "phone": req.body.phone,
        "children": req.body.children
    }
    let ID = await manageServer.addBooking(booking)

    res.send({ID})
})

/*
    AUTH LEVEL 1 ENDPOINTS
    Employee
*/
let employeeMiddleware = (req, res, next) => {
    if(!req.user || req.user.authLevel < 1) return res.sendStatus(403);
    next();
}

app.post('/updateBooking', employeeMiddleware, async (req, res) => {
    res.send(await manageServer.updateBooking(req.body));
})

app.delete('/deleteBooking', employeeMiddleware, async (req, res) => {
    res.send(await manageServer.deleteBooking(req.body.ID));
})

app.post('/updateContactInfo', employeeMiddleware, async (req, res) => {
    res.send(await manageServer.updateContactInfo(req.body));
})

app.delete('/deleteContactInfo', employeeMiddleware, async (req, res) => {
    res.send(await manageServer.deleteBooking(req.body.ID));
})

/*
    AUTH LEVEL 2 ENDPOINTS
    Admin
*/

/* 
    LOGIN ENDPOINTS 
*/

app.get('/login', (req, res) => { // Microsoft Azure login endpoint
    auth.auth.getConsentLink((link) => { // Get a microsoft auth consent link
        res.redirect(link); // Redirect user to authenticate at microsoft
    });
});

app.get('/redirect', (req, res) => { // Microsoft Azure Auth redirect endpoint
    auth.auth.redirect({ // Handle user
        req: req,
        res: res,
    }, (success) => {
        if(success) { // If succesfully logged in
            res.redirect('/'); // Redirect to portal
        }
        else {
            res.send('Login error! Please contact the administrator');
        }
    });
});

app.listen(port, () => {
  console.log(`DISCO UF Server listening on port ${port}`)
})
