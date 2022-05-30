const express = require('express');
const app = express();
const config = require('./config.json');
const port = config.port;

const auth = require('./auth/auth'); // Import auth code

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
  res.send('Hello World!')
})

app.get('/login', (req, res) => { // Microsoft Azure login endpoint
    auth.auth.getConsentLink((link) => { // Get a microsoft auth consent link
        res.redirect(link); // Redirect user to authenticate at microsoft
        //res.send("Login öppnas på måndag");
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
