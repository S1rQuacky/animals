const mongoose = require("./connection");
const Animal = require("./animals")

//seed code


mongoose.connection.on("open", () => {
    const startAnimals = [
        {name: "Dolphin", species: "Mammal", extinct: false, location: "Ocean", lifeExpectancy: 40 },
        {name: "Egyptian goose", species: "Geese", extinct: false, location: "Nile Valley", lifeExpectancy: 25 },
        {name: "Neobatrachia", species: "Amphibian", extinct: false, location: "Ecuadro", lifeExpectancy: 5 },
        {name: "Woolly Mammoth", species: "Mammoth", extinct: true, location: "Alaska", lifeExpectancy: 60 },
    ]
    Animal.remove({}, (err, data) => {
        Animal.create(startAnimals, (err, data) => {
            console.log("--------Animals Created--------");
            console.log(data);
            console.log("--------Animals Created---------");
            mongoose.connection.close();
    });
 });
});