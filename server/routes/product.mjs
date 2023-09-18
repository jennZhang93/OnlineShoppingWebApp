import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", async (req, res) => {
	console.log("product");
	let collection = db.collection("products");
  
	try {
		const items = await collection.find({}).toArray();
		res.send(items).status(200);

		console.log('All items in the collection:');
		console.log(items);
		console.log("FINISHED get all products");
	} catch (err) {
		console.error('ERROR fetching items:', err);
		res.status(500).send('Internal Server Error');
	}
});



export default router;