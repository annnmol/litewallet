import { Request, Response } from "express";

//user defined
import { TransactionService } from "../services/transaction.service";
import {
  CreateTransactionSchema,
  GetTransactionsSchema,
} from "../validations/wallet.validation";

const createTransaction = async (req: Request, res: Response) => {
  try {
    const { id } = req?.params;
    const { amount, description } = req?.body;
    const result = CreateTransactionSchema.safeParse({
      id,
      amount,
      description,
    });

    if (!result.success) {
      // Validation failed,
      return res
        .status(400)
        .json({ error: result.error.errors?.[0]?.message ?? "Invalid data" });
    }

    const transactionService = new TransactionService();
    const { wallet: newWallet, transaction: newTransaction } =
      await transactionService.createTransaction(id, amount, description);

    if (!newWallet || !newTransaction) {
      return res.status(404).json({ error: "Wallet not found" });
    }

    res.status(201).json({
      data: {
        // _id: newTransaction._id.toString(),
        transactionId: newTransaction._id.toString(),
        balance: newWallet?.balance,
      },
    });
  } catch (error) {
    console.log("Error in create transaction controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getTransactions = async (req: Request, res: Response) => {
  try {
    const walletId = req.query?.walletId as string;
    const skip = Number(req.query?.skip) as number;
    const limit = Number(req.query?.limit) as number;
    const dateSortOrder = Number(req.query?.date) as 1 | -1 | undefined; // can be undefined
    const amountSortOrder = Number(req.query?.amount) as 1 | -1 | undefined; // can be undefined

    console.log(
      `🚀 ~ file: transaction.controller.ts:68 ~ getTransactions ~ req?.params:`,
      { walletId, skip, limit, amountSortOrder, dateSortOrder }
    );

    const result = GetTransactionsSchema.safeParse({ walletId, skip, limit });

    if (!result.success) {
      // Validation failed,
      return res
        .status(400)
        .json({ error: result.error.errors?.[0]?.message ?? "Invalid data" });
    }

    if (!walletId) {
      return res.status(400).json({ error: "walletId is required" });
    }

    // let transactions =[];
    // const walletObjectId = new mongoose.Types.ObjectId(walletId as string);
    // if (skip && skip!==0 && limit) {
    //    transactions = await Transaction.find({ walletId: walletObjectId }).select("-createdAt -__v").skip(skip).limit(limit).sort({amount: -1, updatedAt: 1});
    // }
    // else {
    //   transactions = await Transaction.find({ walletId: walletObjectId }).select("-createdAt -__v");
    // }

    const transactionService = new TransactionService();
    const transactions = await transactionService.getTransactions(
      walletId,
      skip,
      limit,
      dateSortOrder,
      amountSortOrder
    );

    res.status(200).json({
      data: transactions,
    });
  } catch (error) {
    console.log("Error in get transaction controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const exportTransactions = async (req: Request, res: Response) => {
  try {
    const walletId = req.query?.walletId as string;
    const skip = Number(req.query?.skip) as number;
    const limit = Number(req.query?.limit) as number;
    const dateSortOrder = Number(req.query?.date) as 1 | -1 | undefined; // can be undefined
    const amountSortOrder = Number(req.query?.amount) as 1 | -1 | undefined; // can be undefined

    const result = GetTransactionsSchema.safeParse({ walletId, skip, limit });

    if (!result.success) {
      // Validation failed,
      return res
        .status(400)
        .json({ error: result.error.errors?.[0]?.message ?? "Invalid data" });
    }

    if (!walletId) {
      return res.status(400).json({ error: "walletId is required" });
    }

    const transactionService = new TransactionService();
    const transactions = await transactionService.getTransactions(
      walletId,
      skip,
      limit,
      dateSortOrder,
      amountSortOrder
    );

    const headers = Object.keys(transactions[0]).join(',');
    const rows = transactions.map(transaction => Object.values(transaction).join(',')).join('\n');

    const csv = `${headers}\n${rows}`;

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=transactions.csv');
    res.status(200);
    res.send(csv);
    
    // res.status(201).json({
    //   data: "ok",
    // });

  } catch (error) {
    console.log("Error in export transaction controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { createTransaction, exportTransactions, getTransactions };
