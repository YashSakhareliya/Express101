import express from 'express';

const app = express();

app.get('/', (req,res)=>{
    res.send('Hello World');
})
let items = [
    {
        id: 1,
        name: 'Apple',
        price: 1.50
    },
    {
        id: 2,
        name: 'Banana',
        price: 0.75
    },
    {
        id: 3,
        name: 'Orange',
        price: 1.25
    },
    {
        id: 4,
        name: 'Pineapple',
        price: 3.50
    }

]

app.get('/products/:pid', (req,res)=>{
    const pid = req.params.pid;
    const product = items.find(item=>item.id == pid);
    if(!product){
        res.status(404).send('Product not found');
        return;
    }
    res.send(product);    
})

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})