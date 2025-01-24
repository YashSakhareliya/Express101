import express from "express";

const router = express.router();

let orders = [
    { id: 1, product: 'Anti-Aging Serum', quantity: 2 },
    { id: 2, product: 'Vitamin C Moisturizer', quantity: 1 },
    { id: 3, product: 'Hyaluronic Acid', quantity: 3 }
  ]



router.get('/:orderID', (req,res)=>{
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

router.get('/products', (req,res)=>{
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


export default router