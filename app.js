import express from 'express';
import fs from 'fs';
import { rateLimit } from 'express-rate-limit'
import hbs from 'hbs';

import mainRouts from './routers/mainRouts.js'
import productRouts from './routers/productRouts.js'

const PORT = process.env.PORT || 5000

const app = express();

const limit = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: "your limits exceeded"
})

// app.use(limit)

// set the view engine to handlebars
app.set('view engine', 'hbs');
// set template view to handlebars
app.set('views', './views');


// Middleware to process JSON requests
app.use(express.json());


app.use((req, res, next)=>{
    let logData = `${req.method} || ${req.path} || ${new Date().toISOString()} \n`;
    fs.appendFile('log.txt',logData, (err)=>{
        if(err) console.error(err);
    })
    next()
})

app.use("/assets",express.static('public'))



app.get('/new',(req,res)=>{
    console.log(`Welcome to GlowDerma - Your Skincare`)
    res.render('index');
})

// Doctors Page
app.get('/doctors', (req, res) => {
    res.render('doctors', {
        title: "Our Expert Doctors",
        description: "GlowDerma specializes in providing top-notch medical care for all your skincare needs. Our team of expert dermatologists is here to help.",
    });
});

// Services Page
app.get('/services', (req, res) => {
    const category = req.query.category || "General Services";
    res.render('services', {
        title: `${category} Services`,
    });
});

// Book Appointment Page
app.post('/book-appointment', (req, res) => {
    const { name, email, service, preferredDate, preferredTime } = req.body;
    res.render('book-appointment', {
        title: "Appointment Confirmation",
        appointment: { name, email, service, preferredDate, preferredTime },
    });
});

// Offerings Page
app.get('/offerings', (req, res) => {
    const offerings = [
        {
            name: "Anti-Aging Treatment",
            price: 5000,
            duration: "60 mins",
            description: "Advanced treatment to reduce fine lines and wrinkles",
            available: true,
        },
        {
            name: "Acne Treatment",
            price: 3000,
            duration: "45 mins",
            description: "Specialized treatment for acne-prone skin",
            available: true,
        },
        {
            name: "Chemical Peel",
            price: 4000,
            duration: "30 mins",
            description: "Skin resurfacing treatment for even tone",
            available: false,
        },
    ];
    res.render('offerings', { title: "Our Offerings", offerings });
});

// Testimonials Page
app.get('/testimonials', (req, res) => {
    const testimonials = [
        {
            name: "John Doe",
            rating: 5,
            comment: "Excellent service!",
            date: "2024-01-20",
        },
        {
            name: "Jane Smith",
            rating: 4,
            comment: "Very professional staff",
            date: "2024-01-18",
        },
    ];
    res.render('testimonials', { title: "Testimonials", testimonials });
});


app.use('/',mainRouts)
app.use('/order', productRouts)


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
// for undefined routs middleware
app.use((req, res) =>{
    console.log(`undefined route hit: ${req.method} ${req.path}`);
    res.status(404).send("We don't have this page yet!");
})


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})