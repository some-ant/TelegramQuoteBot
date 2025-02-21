declare interface QuoteStorage {
    addQuote(quote: Quote): void;
    addQuotes(quotes: Quote[]): void;

    findRandomQuoteByTags(tags: string[]): Promise<Quote | undefined>;
    findRandomQuoteByWord(word: string): Promise<Quote | undefined>;

    findQuotesByTags(tags: string[]): Promise<Quote[]>;
    findQuotesByWord(word: string): Promise<Quote[]>;
}

declare interface QuoteScrapper {
    scrapeQuotes(): Promise<Quote[]>;
}

declare type Quote = {
    quote: string;
    tags: string[];
};

declare type QuoteEntity = {
    quote: string;
    tags: string[];
    createdAt: Date;
};
