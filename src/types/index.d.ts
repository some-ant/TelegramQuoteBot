interface QuoteStorage {
  addQuote(quote: Quote): void;
  addQuotes(quotes: Quote[]): void;

  findQuotesByTags(tags: string[]): Quote[];
  findQuotesByWord(word: string): Quote[];
}

interface QuoteScrapper {
  scrapeQuotes(): Promise<Quote[]>;
}

type Quote = {
  quote: string;
  tags: string[];
};

export { QuoteStorage, QuoteScrapper, Quote };
