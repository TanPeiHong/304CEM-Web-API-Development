const mongoose = require('mongoose');

const db = "mongodb+srv://TanPeiHong:123456Abcdef@cluster0.oy3cj.mongodb.net/FoodDB?retryWrites=true&w=majority";

mongoose.connect(db, {useNewUrlParser: true} ).then(() => {
    console.log("Connected to database");
})

.catch(() => {
    console.log("Error connected to database");
})

//A schema matched the table in the database
const foodSchema = new mongoose.Schema({
    title: {type: String},
    image: {type: String},
    category: {type: String},
    area: {type: String},
    instructions: {type: String}
});

const Food = mongoose.model("FoodDB", foodSchema, "menus");

module.exports = Food;