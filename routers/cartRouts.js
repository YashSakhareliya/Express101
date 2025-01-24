import express from "express";

const router =  express.Router();


let shoppingCart = []
router.get('/', (req,res)=>{
    res.status(200).json(shoppingCart);
})

router.post('/', (req,res)=>{
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

export default router;