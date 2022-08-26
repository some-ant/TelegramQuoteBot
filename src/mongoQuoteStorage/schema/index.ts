import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema({
  id: Number,
  quote: String,
  tags: [String],
  createdAt: Date,
});

export default quoteSchema;
