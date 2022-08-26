interface QuoteStorage {
  addQuote(quote: Quote): void;
  findAllQuotes();
}

interface QuoteScrapper {
  scrapeQuotes(): Promise<Quote[]>;
}

type Quote = {
  quote: string;
  tags: string[];
};

export { QuoteStorage, QuoteScrapper, Quote };
