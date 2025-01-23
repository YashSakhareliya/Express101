import express from 'express';

const PORT = process.env.PORT || 5000

const app = express();

// Middleware to process JSON requests
app.use(express.json());

app.get('/', (req,res)=>{
    res.send('Welcome to GlowDerma - Your Skincare Journey Begins Here');
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
let items = [
    {
      "name": "Hydrating Serum",
      "price": "$25",
      "description": "A lightweight serum that deeply hydrates and plumps the skin."
    },
    {
      "name": "Vitamin C Cream",
      "price": "$30",
      "description": "Brightens skin tone and reduces the appearance of dark spots."
    }
  ]
app.get('/products', (req,res)=>{
    
    res.send(items);    
})

app.post('/products', (req,res)=>{
    console.log(req.body);
    const {name, price, description} = req.body;
 
    if(!name ||!price ||!description){
        return res.status(400).json({
            "error": "All fields are required"
        });
    }
    const newItem = {
        name,
        price,
        description
    }
    items.push(newItem);

    res.status(201).json(newItem);
})

app.get('*', (req, res)=>{
    res.status(404).json({
        "error": "Route not found"
      })
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})