
import bcrypt from 'bcryptjs';
const data = {
    users: [
        {
            name: 'Saksham',
            email: 'admin@example.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: true
        },
        {
            name: 'Ashish',
            email: 'user@example.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: false
        },
    ],
    products: [
        {
            name: 'Nike Slim Shirt',
            category: 'Shirts',
            image: '/images/p1.jpeg',
            price: 120,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 10,
            description: 'high quality product',
            countInStock: 9
        },
        {
            name: 'Adidas Fit Shirt',
            category: 'Shirts',
            image: '/images/p1.jpeg',
            price: 120,
            brand: 'Adidas',
            rating: 4.0,
            numReviews: 10,
            description: 'high quality product',
            countInStock: 0
        },
        {
            name: 'Lacoste free Shirt',
            category: 'Shirts',
            image: '/images/p1.jpeg',
            price: 220,
            brand: 'Lacoste',
            rating: 4.8,
            numReviews: 17,
            description: 'high quality product',
            countInStock: 2
        },
        {
            name: 'Nike Slim Pant',
            category: 'Pants',
            image: '/images/p4.jpeg',
            price: 78,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 14,
            description: 'high quality product',
            countInStock: 8
        },
        {
            name: 'Puma Slim Pant',
            category: 'Pants',
            image: '/images/p4.jpeg',
            price: 65,
            brand: 'Puma',
            rating: 4.5,
            numReviews: 10,
            description: 'high quality product',
            countInStock: 0
        },
        {
            name: 'Adidas Fit Pant',
            category: 'Pants',
            image: '/images/p4.jpeg',
            price: 139,
            brand: 'Adidas',
            rating: 4.5,
            numReviews: 15,
            description: 'high quality product',
            countInStock: 38
        }
    ]
}
export default data;