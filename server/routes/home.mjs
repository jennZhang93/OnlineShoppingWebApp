import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", async (req, res)=> {
    res.send("Welcome!").status(200);
    console.log("home");
});
router.delete("/clearorders", async (req, res)=> {
    await db.collection('orders').deleteMany({});
    res.send("cleared all orders!").status(200);
})


export default router;