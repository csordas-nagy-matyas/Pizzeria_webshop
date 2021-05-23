const mongoose = require('mongoose');

var basketSchema = new mongoose.Schema({
    user: {type: String, unique: true, required: true},
    products: {type: Object, required: true}
}, {collection: 'basket'});

mongoose.model('basket', basketSchema);