import express from "express";

const router = express.Router();


router.get('/', (req,res)=>{
    res.send('Welcome to GlowDerma - Your Skincare Journey Begins Here');
})


router.get('/about', (req,res)=>{
    res.send('h3>We are a premium skincare brand committed to bringing you dermatologist-approved, clean beauty products</h3>')
});


const contactDetails = {
    "email": "care@glowderma.com",
    "instagram": "http://instagram.com/glowderma",
    "consultation": "http://glowderma.com/book-appointment"
}

router.get('/contact', (req,res)=>{
    res.send(contactDetails);
})

export default router;