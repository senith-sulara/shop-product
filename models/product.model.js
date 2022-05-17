let products = require('../data/products.json')
const filename = './data/products.json'
const helper = require('../helpers/helper.js')

function getProducts() {
    return new Promise((resolve, reject) => {
        if (products.length === 0) {
            reject({
                message: 'no products available',
                status: 202
            })
        }

        resolve(products)
    })
}


function insertProducts(newProducts) {
    return new Promise((resolve, reject) => {
        const id = { id: helper.getNewId(products) }
        const date = { 
            createdAt: helper.newDate(),
            updatedAt: helper.newDate()
        } 
        newProducts = { ...id, ...date, ...newProducts }
        products.push(newProducts)
        helper.writeJSONFile(filename, products)
        resolve(newProducts)
    })
}

function updateProducts(id, newProducts) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(products, id)
        .then(post => {
            const index = products.findIndex(p => p.id == post.id)
            id = { id: post.id }
            const date = {
                createdAt: post.createdAt,
                updatedAt: helper.newDate()
            } 
            products[index] = { ...id, ...date, ...newProducts }
            helper.writeJSONFile(filename, products)
            resolve(products[index])
        })
        .catch(err => reject(err))
    })
}

function deleteProducts(id) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(products, id)
        .then(() => {
            products = products.filter(p => p.id !== id)
            helper.writeJSONFile(filename, products)
            resolve()
        })
        .catch(err => reject(err))
    })
}

module.exports = {
    insertProducts,
    getProducts,
    updateProducts,
    deleteProducts
}