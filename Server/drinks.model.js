const mongoose = require('mongoose');

var drinksSchema = new mongoose.Schema({
    id: {type: String, unique: true, required: true},
    price: {type: String, required: true},
    quantity: {type: String, required: true}
}, {collection: 'drinks'});

mongoose.model('drinks', drinksSchema);