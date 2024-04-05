import { Types } from "mongoose";
import { z } from "zod";

export const CreateWalletSchema = z.object({
  name: z.string().trim().min(4, "name should be at least 4 characters long.").max(30, "name should be at most 30 characters long."),
  balance: z.number().min(0, "balance should be a positive number."),
});

export const GetWalletByIdSchema = z.object({
  // id: z.string().uuid("id should be a valid UUID.")
  id: z.string().refine((value) => Types.ObjectId.isValid(value), {
    message: "id should be a valid ObjectID.",
    path: ["id"],
  }),
});

export const UpdateWalletSchema = z.object({
  id: z.string().refine((value) => Types.ObjectId.isValid(value), {
    message: "id should be a valid ObjectID.",
    path: ["id"],
  }),
  name: z.string().trim().min(4, "name should be at least 4 characters long.").max(30, "name should be at most 30 characters long."),
});

export const CreateTransactionSchema = z.object({
  id: z.string().refine((value) => Types.ObjectId.isValid(value), {
    message: "id should be a valid ObjectID.",
    path: ["id"],
  }),
  description: z.string().trim().min(2, "description should be at least 4 characters long.").max(50, "description should be at most 50 characters long."),
  amount: z.number(),
});

export const GetTransactionsSchema = z.object({
  walletId: z.string().refine((value) => Types.ObjectId.isValid(value), {
    message: "walletId should be a valid ObjectID.",
    path: ["walletId"],
  }),
  skip: z.number().min(0, "skip should be a positive number.").refine(value => !isNaN(value), {
    message: "skip should be a number.",
    path: ['skip'],
  }),
  limit: z.number().min(0, "skip should be a positive number.").refine(value => !isNaN(value), {
    message: "limit should be a number.",
    path: ['limit'],
  }),
  dateSortOrder: z.number().optional().refine(value => typeof value === "undefined" || value === -1 || value === 1, {
    message: "date should be either -1 or 1.",
    path: ['dateSortOrder'],
  }),
  amountSortOrder: z.number().optional().refine(value => typeof value === "undefined" || value === -1 || value === 1, {
    message: "amount should be either -1 or 1.",
    path: ['amountSortOrder'],
  }),
});
