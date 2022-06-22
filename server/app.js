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

let corsMiddleware = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next()
}
app.use(corsMiddleware);

let manageServer = require("./manage")(app);

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
    //if(!req.user || req.user.authLevel < 1) return res.sendStatus(403);
    next();
}

app.get('/searchBookings', employeeMiddleware, async (req, res) => {
    if(!req.query.query) req.query.query = "";
    res.send(await manageServer.searchBooking(req.query.query));
})

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
