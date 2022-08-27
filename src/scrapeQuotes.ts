import QuoteScrapperImpl from "./quoteScrapper";
import urls from "./urlStorage";

import MongoQuoteStorage from "./mongoQuoteStorage";

/**
 * Scrapes quotes from provided urls and writes them to 
 * MongoDB storage
 */
(async () => {
  const quoteStorage = new MongoQuoteStorage();

  urls.forEach(async (url) => {
    try {
      const quoteScrapper = new QuoteScrapperImpl(url);
      const quotes = await quoteScrapper.scrapeQuotes();
      quoteStorage.addQuotes(quotes);
    } catch (error) {
      console.log(error);
    }
  });
})();
