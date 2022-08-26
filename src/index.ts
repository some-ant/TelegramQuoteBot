import QuoteScrapperImpl from "./quoteScrapper";
import mongoose from "mongoose";
import urls from "./urlStorage";
import dotenv from "dotenv";

import type { Quote } from "./types";

// let res: Quote[] = [];

// (async () => {
//   urls.forEach(async (url) => {
//     const quoteScrapper = new QuoteScrapperImpl(url);
//     const quotes: Quote[] = await quoteScrapper.scrapeQuotes();
//     res = res.concat(quotes);
//     console.log(quotes);
//   });
// })();

dotenv.config();
mongoose.connect(
  `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@quotes.tflvplr.mongodb.net/?retryWrites=true&w=majority`
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});
