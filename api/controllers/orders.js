const Order = require('../models/order');
const Product = require('../models/product');
const mongoose = require('mongoose');

exports.orders_get_all = (req, res, next) => {
    Order.find()
    .select('product quintity _id')
    .populate('product', 'name')
    .exec()
    .then(docs => {
        res.status(200).json({
            count: docs.length,
            orders: docs.map(doc => {
                return {
                    _id: doc._id,
                    product: doc.product,
                    quintity: doc.quintity,
                    request: {
                     type: "GET",
                     url: 'http://localhost:3000/orders/' + doc._id
                 }
                }
            })
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: err})
    })
 }

 exports.orders_create_order = (req, res, next) => {
    Product.findById(req.body.productId)
    .then(product => {
        if(!product) {
            return res.status(404).json({
                message: "Product not Found"
            })
        }
        const order = new Order({
            _id: mongoose.Types.ObjectId(),
            quintity: req.body.quintity,
            product: req.body.productId
    
        })
        return order.save()
    })
    .then(result => {
        console.log(result)
        res.status(201).json({
            message: 'Order stored',
            createdOrder: {
                _id: result._id,
                product: result.product,
                quintity: result.quintity
            },
            request: {
                type: 'GET',
                url: 'http://localhost:3000/orders/' + result._id
            }
        })
    })
    .catch(err => {
        res.status(500).json({
            message: 'Product not found'
        })
    })
}

exports.orders_get_order = (req, res, next) => {
    Order.findById(req.params.orderId)
    .populate('product')
    .exec()
    .then(order => {
        if(!order) {
            return res.status(404).json({
                message: "Order not found"
            })
        }
        res.status(200).json({
            order: order,
            request: {
                type: 'GET',
                url: 'http://localhost:3000/orders'
            }
        })
    })
    .catch(err => {
        res.status(500).json({error: err})
    });
}

exports.orders_delete_order = (req, res, next) => {
    Order.deleteOne({_id: req.params.orderId})
    .exec()
    .then(result => {
        if(!order) {
            return res.status(404).json({
                message: "Order not found"
            })
        }
        res.status(200).json({
            message: "Order deleted",
            request: {
                type: "POST",
                url: "http://localhost:3000/orders",
                body: {productId: 'ID', quintity: "Number"}
            }
        })
    })
    .catch(err => {
        res.status(500).json({error: err})
    })
}