import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();
let collection = db.collection("accounts");
let myEmail = null; //process.env.ADMIN_EMAIL;

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

export default router;