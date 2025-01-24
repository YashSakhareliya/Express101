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

module.exports = router