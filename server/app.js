const express = require('express')
const app = express()
const port = 3010

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

app.listen(port, () => {
  console.log(`DISCO UF Server listening on port ${port}`)
})
