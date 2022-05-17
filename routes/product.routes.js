const express = require('express')
const router = express.Router()
const product = require('../models/product.model')
const m = require('../helpers/middlewares')

/* All posts */
router.get('/', async (req, res) => {
    await product.getProducts()
    .then(posts => res.json(posts))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
})

/* Insert a new product */
router.post('/', m.checkFieldsProduct, async (req, res) => {
    await product.insertProducts(req.body)
    .then(product => res.status(201).json({
        message: `The product #${product.id} has been created`,
        content: product
    }))
    .catch(err => res.status(500).json({ message: err.message }))
})

/* Update a product */
router.put('/:id', m.mustBeInteger, m.checkFieldsProduct, async (req, res) => {
    const id = req.params.id

    await product.updateProducts(id, req.body)
    .then(product => res.json({
        message: `The product #${id} has been updated`,
        content: product
    }))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        }
        res.status(500).json({ message: err.message })
    })
})

/* Delete a product */
router.delete('/:id', m.mustBeInteger, async (req, res) => {
    const id = req.params.id

    await product.deleteProducts(id)
    .then(product => res.json({
        message: `The product #${id} has been deleted`
    }))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        }
        res.status(500).json({ message: err.message })
    })
})

module.exports = router