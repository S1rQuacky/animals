const express = require("express");
const Animal = require("../models/animals.js")

//create route
const router = express.Router()

//Routes
router.get("/seed", (req, res) => {
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
router.get("/", (req, res) => {
    Animal.find({}, (err, animals) => {
        res.render("animals/index.ejs", { animals })
    });
});


///New
router.get("/new", (req, res) => {
    res.render("animals/new.ejs")
});
///Create
router.post("/", (req, res) => {
    req.body.extinct = req.body.extinct === "on" ? true : false
    Animal.create(req.body, (err, animals) => {
        res.redirect("/animals")
    });
});

///Edit
router.get("/:id/edit", (req, res) => {
    const id = req.params.id
    Animal.findById(id, (err, animals) => {
        res.render("animals/edit.ejs", { animals })
    });
});

///Update
router.put("/:id", (req, res) => {
    const id = req.params.id
    req.body.extinct = req.body.extinct === "on" ? true : false
    Animal.findByIdAndUpdate(id, req.body, {new: true}, (err, animals) => {
        res.redirect("/animals")
    });
});

///Destroy
router.delete("/:id", (req, res) => {
    const id = req.params.id
    Animal.findByIdAndRemove(id, (err, animals) => {
        res.redirect("/animals")
    });
});

///Show
router.get("/:id", (req, res) => {
    const id = req.params.id
    Animal.findById(id, (err, animals) => {
        res.render("animals/show.ejs", { animals });
    });
});

//export router
module.exports = router;