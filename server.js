// DEPENDENCIES
const express = require("express")
const connectDB = require("./config/database")
const dotenv = require("dotenv").config()
const colors = require("colors")
const port = process.env.PORT || 5000
const bookRoute = require("./routes/bookRoute")
const errorHandler = require("./config/errorHandler")
const cors = require("cors");

// INITIALIZERS
const app = express()
connectDB()

// MIDDLEWARE
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

// AUTH0 AUTHENTICATION
const { auth, requiresAuth } = require('express-openid-connect');

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
};

app.use(auth(config));

app.get('/', (request, response) => {
    response.send(request.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

app.get('/profile', requiresAuth(), (request, response) => {
    response.send(JSON.stringify(request.oidc.user));
});


// ROUTES
app.use("/book", bookRoute)


// VIEWS AND PUBLIC FOLDERS (FOR LAYOUTS)
// app.set("view engine", "ejs")
// app.set("views", __dirname + "/views")
// app.set("layout", "layouts/layout")
// app.use(expressLayouts)
// app.use(express.static("public"))


// ERROR HANDLER FUNCTION CALL (MUST BE PLACED AT THE END, JUST BEFORE APP.LISTEN)
app.use(errorHandler)


// SERVER LISTENING
app.listen(port, () => console.log(`Server started on port ${port}`))
