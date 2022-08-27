import mongoose from "mongoose";
import dotenv from "dotenv";

import type { Quote, QuoteStorage } from "../types";
import quoteSchema from "./schema";

class MongoQuoteStorage implements QuoteStorage {
  private db: mongoose.Connection;
  private QuoteModel;

  constructor() {
    dotenv.config();

    mongoose.connect(
      `mongodb+srv://${process.env.TELEGRAM_QUOTE_BOT_APP_USERNAME}:${process.env.TELEGRAM_QUOTE_BOT_APP_PASSWORD}@quotes.tflvplr.mongodb.net/${process.env.TELEGRAM_QUOTE_BOT_APP_DB}?retryWrites=true&w=majority`
    );

    this.db = mongoose.connection;
    this.db.on("error", console.error.bind(console, "connection error: "));
    this.db.once("open", function () {
      console.log("Connected successfully to MongoDB");
    });

    this.QuoteModel = mongoose.model("Quote", quoteSchema);
  }

  addQuote(quote: Quote): void {
    const quoteEntity = new this.QuoteModel({ ...quote, createdAt: Date.now() });
    quoteEntity.save((err) => {
      if (err) {
        console.log(err);
      }
    });
  }

  addQuotes(quotes: Quote[]): void {
    this.QuoteModel.insertMany(quotes.map((quote) => ({ ...quote, createdAt: Date.now() })))
      .then(() => {
        console.log(`${quotes.length} Quotes Added`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  findQuotesByTags(tags: string[]): Quote[] {
    throw new Error("Method not implemented.");
  }

  findQuotesByWord(word: string): Quote[] {
    throw new Error("Method not implemented.");
  }
}

export default MongoQuoteStorage;
