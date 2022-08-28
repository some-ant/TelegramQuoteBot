import mongoose from "mongoose";

import { QuoteEntity } from "../../types";

const quoteSchema = new mongoose.Schema<QuoteEntity>({
  quote: String,
  tags: [String],
  createdAt: Date,
});

export default quoteSchema;
