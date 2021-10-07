/// Import Dependencies, to be moved to /utils/middlware.js at then end.
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const mongoose = require("mongoose");

/// Database connections - will later be moved to /models/connection.js
const DATABASE_URL = process.env.DATABASE_URL
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

mongoose.connect(DATABASE_URL, CONFIG);

mongoose.connection
.on("open", () => console.log("Connected to Mongo"))
.on("close", () => console.log("Disconnected from Mongo"))
.on("error", (error) => console.log(error))

///Our models - pull schema from mongoose, make schema, make model
const {Schema, model} = mongoose

const animalSchema = new Schema({
    name: String,
    species: String,
    extinct: Boolean,
    location: String,
    lifeExpectancy: Number,
});

const Animal = model("Animal", animalSchema);

///Express application object
const app = express();

///Middleware
app.use(morgan("tiny"));
app.use(methodOverride("_method"));
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));


///Routes
app.get("/animals/seed", (req, res) => {
    const startAnimals = [
        {name: "Dolphin", species: "Mammal", extinct: false, location: "Ocean", lifeExpectancy: 40 },
        {name: "Egyptian goose", species: "Geese", extinct: false, location: "Nile Valley", lifeExpectancy: 25 },
        {name: "Neobatrachia", species: "Amphibian", extinct: false, location: "Ecuadro", lifeExpectancy: 5 },
        {name: "Woolly Mammoth", species: "Mammoth", extinct: true, location: "Alaska", lifeExpectancy: 60 },
    ]
    Animal.remove({}, (err, data) => {
        Animal.create(startAnimals, (err, data) => {
            res.json(data);
            }
        );
    });
});

///Index
app.get("/animals", (req, res) => {
    Animal.find({}, (err, animals) => {
        res.render("animals/index.ejs", { animals })
    });
});

app.get("/", (req, res) => {
    res.send("Animals up and running")
});

///New
app.get("/animals/new", (req, res) => {
    res.render("animals/new.ejs")
});
///Create
app.post("/animals", (req, res) => {
    req.body.extinct = req.body.extinct === "on" ? true : false
    Animal.create(req.body, (err, animals) => {
        res.redirect("/animals")
    });
});

///Edit
app.get("/animals/:id/edit", (req, res) => {
    const id = req.params.id
    Animal.findById(id, (err, animals) => {
        res.render("animals/edit.ejs", { animals })
    });
});

///Update
app.put("/animals/:id", (req, res) => {
    const id = req.params.id
    req.body.extinct = req.body.extinct === "on" ? true : false
    Animal.findByIdAndUpdate(id, req.body, {new: true}, (err, animals) => {
        res.redirect("/animals")
    });
});

///Destroy
app.delete("/animals/:id", (req, res) => {
    const id = req.params.id
    Animal.findByIdAndRemove(id, (err, animals) => {
        res.redirect("/animals")
    });
});

///Show
app.get("/animals/:id", (req, res) => {
    const id = req.params.id
    Animal.findById(id, (err, animals) => {
        res.render("animals/show.ejs", { animals });
    });
});

///Server listener
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))

