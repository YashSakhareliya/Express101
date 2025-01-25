import express from 'express';
import fs from 'fs';
import { rateLimit } from 'express-rate-limit'
import hbs from 'hbs';

import mainRouts from './routers/mainRouts.js'
import productRouts from './routers/productRouts.js'
import ordersRouts from './routers/ordersRouts.js'
import cartRouts from './routers/cartRouts.js'
import viewRouts from './routers/viewRouts.js'

const PORT = process.env.PORT || 5000

const app = express();

const limit = rateLimit()

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



// Routs 

app.use('/',mainRouts)
app.use('/products', productRouts)
app.use('/orders', ordersRouts)
app.use('/cart', cartRouts)
app.use('/view', viewRouts)

app.get('/new',(req,res)=>{
    console.log(`Welcome to GlowDerma - Your Skincare`)
    res.render('index');
})



// app.get('*', (req, res)=>{
//     res.status(404).json({
//         "error": "Route not found"
//       })
// })

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