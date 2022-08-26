import QuoteScrapperImpl from "./quoteScrapper";
import urls from "./urlStorage";

import type { Quote } from "./types";

let res: Quote[] = [];

const scrape = (async () => {
  urls.forEach(async (url) => {
    const quoteScrapper = new QuoteScrapperImpl(url);
    const quotes: Quote[] = await quoteScrapper.scrapeQuotes();
    res = res.concat(quotes);
    console.log(quotes);
  });

  console.log("Total" + res.length);
})();
