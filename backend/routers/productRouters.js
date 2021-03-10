import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import data from '../data.js'
import Product from '../models/productModel.js'
import { isAuth, isAdmin } from '../utils.js';
import { isDate } from 'util';

const productRouter = express.Router();

productRouter.get('/', expressAsyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.send(products)
}))

productRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    const createdProduct = await Product.insertMany(data.products)
    res.send({ createdProduct })
}))

productRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        res.send(product)
    } else {
        res.status(404).send({ message: 'Product Not Found' })
    }
}))

productRouter.put('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId)
    if (product) {
        product.name = req.body.name;
        product.price = req.body.price;
        product.image = req.body.image;
        product.category = req.body.category;
        product.brand = req.body.brand;
        product.countInStock = req.body.countInStock;
        product.description = req.body.description;
        const updatedProduct = await product.save();
        res.send(updatedProduct)
    } else {
        res.status(404).send({ message: 'Product not found' })
    }
}))

productRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        const deleteProduct = await product.remove()
        res.send({ message: 'Product deleted', product: deleteProduct })
    } else {
        res.status(404).send('Product not found')
    }
}))

export default productRouter