import products from "./product.mjs";
import home from "./home.mjs";
import acc from "./account.mjs";
import express from 'express';

const router = express.Router();

router.use("/", home);
router.use("/me", acc);
router.use("/product", products);


export default router; 