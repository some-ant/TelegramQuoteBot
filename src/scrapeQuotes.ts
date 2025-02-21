import { QuoteScrapperImpl } from './quoteScrapper';
import urls from './urlStorage';

import MongoQuoteStorage from './mongoQuoteStorage';

/**
 * Scrapes quotes from provided urls and writes them to
 */
(async () => {
    const quoteStorage = new MongoQuoteStorage();


    urls.forEach(async (url) => {
        try {
            const quoteScrapper = new QuoteScrapperImpl(url);
            const quotes = await quoteScrapper.scrapeQuotes();
            console.log(`Scraped ${quotes.length} quotes from ${url}`);
            quoteStorage.addQuotes(quotes);
        } catch (error) {
            console.log(error);
        }
    });
})();
