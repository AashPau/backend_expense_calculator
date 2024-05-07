import transactionSchema from "./transactionSchema.js";

export const insertNewTrans = (transObj) => {
  return transactionSchema(transObj).save();
};

export const getTransactionsByUserId = (userId) => {
  return !userId ? null : transactionSchema.find({ userId });
};
