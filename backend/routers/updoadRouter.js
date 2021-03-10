import multer from 'multer'
import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import { isAuth, isAdmin } from '../utils.js';

const uploadRauter = express.Router()

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}.jpg`)
    }
})

const upload = multer({ storage })

// uploadRauter.post('/', isAuth, upload.single('image'), (req, res) => {
//     res.send(`/${req.file.path}`);
// });
uploadRauter.post('/', isAuth, upload.single('image'), (req, res) => {
    res.send(`/${req.file.path}`)
})


export default uploadRauter
