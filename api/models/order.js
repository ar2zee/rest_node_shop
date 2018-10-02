const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product: { type: mongoose.Schema.ObjectId, ref: 'Product', required: true},
    quintity: {type: Number, default: 1}
});

module.exports = mongoose.model('Order', orderSchema);