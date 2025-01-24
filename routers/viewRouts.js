import e from "express";
import express from "express";

const router = express.Router();
// Doctors Page
router.get('/doctors', (req, res) => {
    res.render('doctors', {
        title: "Our Expert Doctors",
        description: "GlowDerma specializes in providing top-notch medical care for all your skincare needs. Our team of expert dermatologists is here to help.",
    });
});

// Services Page
router.get('/services', (req, res) => {
    const category = req.query.category || "General Services";
    res.render('services', {
        title: `${category} Services`,
    });
});

// Book Appointment Page
router.post('/book-appointment', (req, res) => {
    const { name, email, service, preferredDate, preferredTime } = req.body;
    res.render('book-appointment', {
        title: "Appointment Confirmation",
        appointment: { name, email, service, preferredDate, preferredTime },
    });
});

// Offerings Page
router.get('/offerings', (req, res) => {
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
router.get('/testimonials', (req, res) => {
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


export default router;
