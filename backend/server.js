import express from 'express';
import data from './data.js'
import path from 'path'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import userRouter from './routers/userRouters.js';
import orderRouter from './routers/orderRouters.js';
import productRouter from './routers/productRouters.js';
import uploadRauter from './routers/updoadRouter.js';

dotenv.config()

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/amazona', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

const connection = mongoose.connection;

connection.once("open", function () {
    console.log("MongoDB database connection established successfully");
});


app.use('/api/uploads', uploadRauter)
app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/orders', orderRouter)
app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID)
})
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
app.use(express.static(path.join(__dirname, '/frontend/build')))
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'frontend/build/index.html')))
// app.get('/', (req, res) => {
//     res.send('Server is ready');
// })

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message })
})

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server at http://localhost:${port}`)
});
