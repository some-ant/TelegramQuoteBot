interface QuoteScrapper {
  scrapeQuotes(): Promise<Quote[]>;
}

type Quote = {
  quote: string;
  tags: string[];
};

export { QuoteScrapper, Quote };
