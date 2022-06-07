const express = require('express');
const app =   express()
            , cookieParser = require('cookie-parser')
            , bodyParser = require('body-parser')


const config = require('./config.json');
const port = config.port;

app.use(cookieParser());  // Use cookie parser
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit:50000}));
app.use(express.json()); // Use express JSON

const auth = require('./auth/auth'); // Import auth code
app.use(auth.jwt.authenticateToken); // Use middleware for auth token

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


app.get('/', (req, res) => {
    if(!req.user) return res.redirect('/ads');
    res.send(req.user)
})

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
