//import dependencies 
const mongoose = require("./connection")

//Define Model
const {Schema, model} = mongoose

const animalSchema = new Schema({
    name: String,
    species: String,
    extinct: Boolean,
    location: String,
    lifeExpectancy: Number,
});

const Animal = model("Animal", animalSchema);

//Export Model
module.exports = Animal