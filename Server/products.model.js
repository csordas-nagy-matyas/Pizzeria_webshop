const mongoose = require('mongoose');

var productsSchema = new mongoose.Schema({
    id: {type: String, unique: true, required: true},
    price: {type: String, required: true},
    quantity: {type: String, required: true}
}, {collection: 'products'});

mongoose.model('products', productsSchema);