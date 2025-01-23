import express from 'express';
import fs from 'fs';
const PORT = process.env.PORT || 5000

const app = express();

// Middleware to process JSON requests
app.use(express.json());

app.get('/', (req,res)=>{
    res.send('Welcome to GlowDerma - Your Skincare Journey Begins Here');
})

app.use((req, res, next)=>{
    let logData = `${req.method} || ${req.path} || ${new Date().toISOString()} \n`;
    fs.appendFile('log.txt',logData, (err)=>{
        if(err) console.error(err);
    })
    next()
})

app.get('/about', (req,res)=>{
    res.send('h3>We are a premium skincare brand committed to bringing you dermatologist-approved, clean beauty products</h3>')
});

const contactDetails = {
    "email": "care@glowderma.com",
    "instagram": "http://instagram.com/glowderma",
    "consultation": "http://glowderma.com/book-appointment"
}

app.get('/contact', (req,res)=>{
    res.send(contactDetails);
})
// let items = [
//     {
//       "name": "Hydrating Serum",
//       "price": "$25",
//       "description": "A lightweight serum that deeply hydrates and plumps the skin."
//     },
//     {
//       "name": "Vitamin C Cream",
//       "price": "$30",
//       "description": "Brightens skin tone and reduces the appearance of dark spots."
//     }
//   ]
// app.get('/products', (req,res)=>{
    
//     res.send(items);    
// })

// app.post('/products', (req,res)=>{
//     console.log(req.body);
//     const {name, price, description} = req.body;
 
//     if(!name ||!price ||!description){
//         return res.status(400).json({
//             "error": "All fields are required"
//         });
//     }
//     const newItem = {
//         name,
//         price,
//         description
//     }
//     items.push(newItem);

//     res.status(201).json(newItem);
// })

let orders = [
  { id: 1, product: 'Anti-Aging Serum', quantity: 2 },
  { id: 2, product: 'Vitamin C Moisturizer', quantity: 1 },
  { id: 3, product: 'Hyaluronic Acid', quantity: 3 }
]

app.get('/orders/:orderID', (req,res)=>{
    const orderID = req.params.orderID;
    const order = orders.find(order => order.id === parseInt(orderID));

    if(!order){
        res.status(404).json({"error": "Order not found"});
    }

    res.status(200).json(order);
})

let products = [
  { id: 11, name: "Retinol Serum", price: 1200, availableQty: 50 },
  { id: 12, name: "Niacinamide Solution", price: 800, availableQty: 30 },
  { id: 14, name: "Peptide Moisturizer", price: 1500, availableQty: 100 },
  { id: 15, name: "Glycolic Acid Toner", price: 900, availableQty: 20 }
]

app.get('/products', (req,res)=>{
    const {name, maxPrice} = req.body;
    if(!name && !maxPrice ){
        return res.status(200).json(products);
    }
    let product;
    if(name && !maxPrice){
        product = products.filter(product => product.name === name);
        return res.status(200).json(product);
    }
    if(!name && maxPrice){
        product = products.filter(product => product.price <= maxPrice);
        return res.status(200).json(product);
    }
    product = products.filter(product => product.name === name && product.price <= maxPrice);
    return res.status(200).json(product);
})

let shoppingCart = []
app.get('/cart', (req,res)=>{
    res.status(200).json(shoppingCart);
})

app.post('/cart', (req,res)=>{
    const {id, name, price} = req.body;
 
    if(!name ||!price ||!id){
        return res.status(400).json({
            "error": "All fields are required"
        });
    }
    const newItem = {
        id,
        name,
        price
    }
    shoppingCart.push(newItem);

    res.status(201).json(newItem);

})

app.get('*', (req, res)=>{
    res.status(404).json({
        "error": "Route not found"
      })
})

app.use((error, req, res)=>{
    res.status(500).json({
        "error": error.message
      })
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})