import { Types } from "mongoose";
import { z } from "zod";

export const CreateWalletSchema = z.object({
  name: z.string().trim().min(4, "name should be at least 4 characters long."),
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
  name: z.string().trim().min(4, "name should be at least 4 characters long."),
});
