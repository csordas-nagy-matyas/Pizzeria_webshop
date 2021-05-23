const mongoose = require('mongoose');

var ordersSchema = new mongoose.Schema({
    user: {type: String, required: true},
    date: {type: String, required: true},
    products: {type: [{ id: String, price: String}], required: true}
}, {collection: 'orders'});

mongoose.model('orders', ordersSchema);