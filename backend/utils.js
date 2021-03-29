import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            isSeller: user.isSeller
        },
        process.env.JWT_SECRET || 'somethingecret',
        {
            expiresIn: '30d'
        }
    )
}

export const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (authorization) {
        const token = authorization.slice(7, authorization.length); //Bearer xxxxxx
        jwt.verify(
            token,
            process.env.JWT_SECRET || 'somethingecret',
            (err, decode) => {
                if (err) {
                    res.status(401).send({ message: 'Invalid Token' })
                } else {
                    req.user = decode;
                    next();
                }
            }
        )
    } else {
        res.status(401).send({ message: 'No Token' })
    }
}

export const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401).send({ message: 'Invalid admin token' })
    }
}

export const isSeller = (req, res, next) => {
    if (req.user && req.user.isSeller) {
        next()
    } else {
        res.status(401).send({ message: 'Invalid seller token' })
    }
}

export const isSellerOrAdmin = (req, res, next) => {
    if (req.user && (req.user.isAdmin || req.user.isSeller)) {
        next()
    } else {
        res.status(401).send({ message: 'Invalid admin token' })
    }
}