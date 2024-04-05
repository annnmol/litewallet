import mongoose, { PipelineStage } from "mongoose";
import { roundToFourDecimalPlaces } from "../lib/utils";
import Transaction from "../models/transaction.model";
import Wallet from "../models/wallet.model";

export class TransactionService {
  // wallet: IWallet;
  // constructor(wallet: IWallet) {
  //   this.wallet = wallet;
  // }

  async createTransaction(walletId: string, amount: number, description: string) {

    const objectId = new mongoose.Types.ObjectId(walletId);
    const wallet = await Wallet.findById(objectId).select("-createdAt -__v");

    if (!wallet) {
      // throw new Error("Wallet not found");
      return {
        wallet: null,
        transaction: null,
      }
    }

    const currentBalance = wallet?.balance;
    const roundOffAmount = roundToFourDecimalPlaces(amount);
    const newBalance = roundToFourDecimalPlaces(
      currentBalance + roundOffAmount
    );
    const type = roundOffAmount > 0 ? "CREDIT" : "DEBIT";

    //create a transaction with the initial balance
    const newTransaction = new Transaction({
      walletId: wallet?._id,
      balance: newBalance, // after transaction balance
      amount: roundOffAmount, // transaction amount
      description: description,
      type: type,
    });

    wallet.balance = newBalance;
    await Promise.all([wallet.save(), newTransaction.save()]);

    return {
      wallet: wallet,
      transaction: newTransaction,
    };
  }

  async getTransactions(
    walletId: string,
    skip: number,
    limit: number,
    dateSortOrder: 1 | -1 | undefined, 
    amountSortOrder: 1 | -1 | undefined
  ) {
    const walletObjectId = new mongoose.Types.ObjectId(walletId as string);

    const pipeline: PipelineStage[] = [
      { $match: { walletId: walletObjectId } },
      {
        $project: {
          _id: 1,
          balance: 1,
          amount: 1,
          description: 1,
          type: 1,
          date: "$updatedAt",
        },
      },
    ];

    if (typeof amountSortOrder !== "undefined" && !Number.isNaN(amountSortOrder)) {
      pipeline.push({ $sort: {amount:amountSortOrder } });
    }

    if (typeof dateSortOrder !== "undefined" && !Number.isNaN(dateSortOrder)) {
      pipeline.push({ $sort: {date:dateSortOrder } });
    }
    
    if (skip) {
      pipeline.push({ $skip: skip });
    }

    if (limit) {
      pipeline.push({ $limit: limit });
    }

    const transactions = await Transaction.aggregate(pipeline);
    return transactions ?? [];
  }
}
