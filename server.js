/// Import Dependencies, to be moved to /utils/middlware.js at then end.
require("dotenv").config()
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
// const Animal = require("./models/animals")
const AnimalRouter = require("./controllers/animals")


/// Database connections - will later be moved to /models/connection.js

///Our models - pull schema from mongoose, make schema, make model


///Express application object
const app = express();

///Middleware
app.use(morgan("tiny"));
app.use(methodOverride("_method"));
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use("/animals", AnimalRouter)


///Routes


///Server listener
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))

