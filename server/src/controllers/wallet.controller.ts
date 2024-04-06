import { Request, Response } from "express";
import Wallet from "../models/wallet.model";
import { roundToFourDecimalPlaces } from "../lib/utils";
import {
  CreateWalletSchema,
  GetWalletByIdSchema,
  UpdateWalletSchema,
} from "../validations/wallet.validation";
import mongoose from "mongoose";
import Transaction from "../models/transaction.model";

const createWallet = async (req: Request, res: Response) => {
  try {
    const { balance, name } = req?.body;
    const result = CreateWalletSchema.safeParse(req?.body);

    if (!result.success) {
      // Validation failed,
      return res
        .status(400)
        .json({ error: result.error.errors?.[0]?.message ?? "Invalid data" });
    }

    // if (!name) {
    //   return res.status(400).json({ error: "name is required field." });
    // }

    // if (!balance) {
    //   return res.status(400).json({ error: "balance is required field." });
    // }

    // Check if username exists
    const walletWithSameUsername = await Wallet.findOne({ name });

    if (walletWithSameUsername) {
      return res
        .status(400)
        .json({ error: "Wallet with this name already exists" });
    }

    //create wallet with 0 balance
    //then create a transaction with the initial balance
    //then update the wallet balance
    //then update the transaction balance

    const newWallet = new Wallet({
      balance: 0.0, // initial balance
      name: name,
    });

    const roundOffBalance = roundToFourDecimalPlaces(balance);

    //create a transaction with the initial balance
    const newTransaction = new Transaction({
      walletId: newWallet._id,
      balance: roundOffBalance, // initial balance
      amount: roundOffBalance,
      description: "Initial balance",
      type: "CREDIT",
    });

    newWallet.balance = roundOffBalance;

    await Promise.all([newWallet.save(), newTransaction.save()]);

    res.status(201).json({
      data: {
        _id: newWallet._id.toString(),
        balance: newWallet.balance,
        name: newWallet.name,
        date: newWallet.updatedAt,
      },
    });

  } catch (error) {
    console.log("Error in setup wallet controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getWalletById = async (req: Request, res: Response) => {
  try {
    const { id } = req?.params;

    const result = GetWalletByIdSchema.safeParse(req?.params);

    if (!result.success) {
      // Validation failed,
      return res
        .status(400)
        .json({ error: result.error.errors?.[0]?.message ?? "Invalid data" });
    }

    const objectId = new mongoose.Types.ObjectId(id);
    const wallet = await Wallet.findById(objectId).select("-createdAt -__v");

    if (!wallet) {
      return res.status(404).json({ error: "Wallet not found" });
    }

    // Convert _id to string and rename updatedAt
    const walletResponse = {
      _id: wallet._id.toString(),
      name: wallet.name?.trim(),
      balance: wallet.balance,
      date: wallet.updatedAt,
    };

    res.status(200).json({
      data: walletResponse,
    });
  } catch (error) {
    console.log("Error in get wallet controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const updateWallet = async (req: Request, res: Response) => {
  try {
    const { id } = req?.params;
    const { name } = req?.body;

    const result = UpdateWalletSchema.safeParse({ id, name });

    if (!result.success) {
      // Validation failed,
      return res
        .status(400)
        .json({ error: result.error.errors?.[0]?.message ?? "Invalid data" });
    }

    const objectId = new mongoose.Types.ObjectId(id);
    const wallet = await Wallet.findById(objectId).select("-createdAt -__v");

    if (!wallet) {
      return res.status(404).json({ error: "Wallet not found" });
    }

    wallet.name = name?.trim();
    await wallet.save();

    // Convert _id to string and rename updatedAt
    const walletResponse = {
      id: wallet._id.toString(),
      name: wallet.name,
      balance: wallet.balance,
      date: wallet.updatedAt,
    };

    res.status(200).json({
      data: walletResponse,
    });
  } catch (error) {
    console.log("Error in put wallet controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { createWallet, getWalletById, updateWallet };
