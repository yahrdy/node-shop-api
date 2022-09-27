const express = require('express')
const router = express.Router()

const Product = require('../models/product')
const mongoose = require("mongoose");

router.get('/', (req, res, next) => {
    Product.find().exec().then(response => {
        res.status(200).json(response)
    }).catch(error => {
        res.status(500).json({
            error: error
        })
    })
})

router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })
    product.save().then(result => {
        console.log(result)
    }).catch(err => console.log(err))
    res.status(201).json({
        message: 'Handling POST requests to /products',
        createdProduct: product
    })
})

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId
    Product.findById(id).exec().then(response => {
        if (response){
            res.status(200).json(response)
        } else {
            res.status(404).json({
                message: 'No valid entry found for provided ID'
            })
        }
    }).catch(error => {
        res.status(500).json({
            error: error
        })
    })
})

router.put('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Updated product!'
    })
})

router.delete('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted product!'
    })
})

module.exports = router