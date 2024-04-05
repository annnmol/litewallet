import express from "express";

//user defined
import { createWallet, getWalletById, updateWallet } from "../controllers/wallet.controller";

const walletRouter = express.Router();

walletRouter.post("/setup", createWallet);
walletRouter.put("/:id", updateWallet);
walletRouter.get("/:id", getWalletById);


export default walletRouter;
