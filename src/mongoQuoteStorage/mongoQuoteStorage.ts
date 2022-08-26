import mongoose from "mongoose";

import type { Quote, QuoteStorage } from "../types";

class MongoQuoteStorage implements QuoteStorage {
  constructor() {}

  addQuote(quote: Quote): void {
    throw new Error("Method not implemented.");
  }
  findAllQuotes() {
    throw new Error("Method not implemented.");
  }
}

export default MongoQuoteStorage;
