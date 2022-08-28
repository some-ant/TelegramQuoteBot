import mongoose from "mongoose";
import dotenv from "dotenv";

import quoteSchema from "./schema";

import type { Quote, QuoteStorage, QuoteEntity } from "../types";

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

    this.QuoteModel = mongoose.model<QuoteEntity>("Quote", quoteSchema);
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
    this.QuoteModel.insertMany(
      quotes.map((quote) => ({ ...quote, createdAt: Date.now() })),
      { ordered: false }
    )
      .then(() => {
        console.log(`${quotes.length} Quotes Added`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async findRandomQuoteByTags(tags: string[]): Promise<Quote | undefined> {
    const quotes = await this.QuoteModel.aggregate<Quote | undefined>([
      { $match: { tags: { $in: tags } } },
      { $sample: { size: 1 } },
    ]);
    return quotes[0];
  }

  async findRandomQuoteByWord(word: string): Promise<Quote | undefined> {
    const quotes = await this.QuoteModel.aggregate<Quote | undefined>([
      { $match: { quote: { $regex: word } } },
      { $sample: { size: 1 } },
    ]);
    return quotes[0];
  }

  async findQuotesByTags(tags: string[]): Promise<Quote[]> {
    const quotes = await this.QuoteModel.find({ tags: { $in: tags } });
    return quotes;
  }

  async findQuotesByWord(word: string): Promise<Quote[]> {
    const quotes = await this.QuoteModel.find({ quote: { $regex: word } });
    return quotes;
  }
}

export default MongoQuoteStorage;
