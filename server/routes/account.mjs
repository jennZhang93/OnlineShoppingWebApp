import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();
let collection = db.collection("accounts");
let orderCollection = db.collection("orders");
let myEmail = 'uiuc1@uiuc.com'; //null; //process.env.ADMIN_EMAIL;

///////////////create my acc /////////////////
router.post("/", async (req, res) => {
	try {
		let newAcc = {
            email: req.body.email,
            zip: req.body.zip,
            password: req.body.password,
            cart: []
        };
        myEmail = newAcc.email;
        let result = await collection.insertOne(newAcc);
        res.send(result).status(204);
	} catch (err) {
        res.status(500).send('Internal Server Error');
		console.error('ERROR fetching items:', err);
}
});

///////////////checkout carts / create new order /////////////////
router.post("/order", async (req, res) => {
    let newOrder = {
        email: req.body.email,
        price: 0,
        purchased_items: []
    };
	try {
        //find my acc
		const myacc = await collection.findOne({email: myEmail });
        const myzip = myacc.zip;
        const myitems = myacc.cart;
        let totalPrice = 0;
        let notAvailable = []; 

        const allProducts = await db.collection('products').find({}).toArray();

        //loop through, collect all undeliverable items
        myitems.forEach( itemId => {
            const prodInfo = allProducts.find( prod => prod.id === itemId ); 

            if(prodInfo.not_serving_zip!=myzip[0]) { //find price 
                totalPrice += prodInfo.price;
                newOrder.purchased_items.push( itemId );
            }
            else notAvailable.push ( itemId );
        });
        
        
        //set total price for deliverable items
        newOrder.price = totalPrice;

        //create newOrder and insert to mongodb collection
        let result = await orderCollection.insertOne(newOrder);
        const response = { not_available_items: notAvailable, newOrder: newOrder };
        res.send(response).status(204);

	} catch (err) {
        res.status(500).send('Internal Server Error');
		console.error('ERROR fetching items:', err);
}
});

///////////////get all cart items/////////////////
router.get("/cart", async (req, res) => {  
	try {
		const acc = await collection.findOne({email: myEmail });
        const items = acc.cart;
		res.send(items).status(200);
	} catch (err) {
        res.status(500).send('Internal Server Error');
		console.error('ERROR fetching items:', err);
}});

///////////////add item to my cart/////////////////
router.patch("/cart", async (req, res) => { 
    console.log(myEmail);
    console.log(req.body.id_product);
    try {
		const query = { email: myEmail }; 
        const update = { $push: { cart: req.body.id_product} };
      
        const result = await collection.updateOne(query, update); 
        res.send(result).status(200);
        console.log(result);
    } catch (err) {
        console.error('ERROR patching items:', err);
        res.status(500).send('Internal Server Error');
}});

///////////////delete item from cart :id/////////////////
router.delete("/", async (req, res) => {
    try {
		const query = { email: myEmail };       
        const result = await collection.deleteOne(query); 
        res.send(result).status(200);
        console.log(result);
    } catch (err) {
        console.error('ERROR delete acc:', err);
        res.status(500).send('Internal Server Error');
}});

export default router;