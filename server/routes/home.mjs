import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", async (req, res)=> {
    res.send("Welcome!").status(200);
    console.log("home");
});



export default router;