import QuoteScrapperImpl from "./quoteScrapper";
import { Quote } from "./types";

const url = "https://citaty.info/rating/best?page=";
let res: Quote[] = [];

const scrape = (async () => {
  for (let i = 0; i < 7; i++) {
    const quoteScrapper = new QuoteScrapperImpl(`${url}${i}`);
    const quotes: Quote[] = await quoteScrapper.scrapeQuotes();
    res = res.concat(quotes);
    console.log(quotes);
  }

  console.log("Total" + res.length);
})();
