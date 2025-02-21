import axios from 'axios';
import * as cheerio from 'cheerio';

export class QuoteScrapperImpl implements QuoteScrapper {
    private url: string;

    constructor(url: string) {
        this.url = url;
    }

    async scrapeQuotes(): Promise<Quote[]> {
        try {
            const quotes: Quote[] = [];
            const { data } = await axios.get(this.url);
            const $ = cheerio.load(data);
            const articles = $('article');

            articles.each((index: number, el) => {
                let quote = $(el).find('.field-name-body p').text();

                const tags: string[] = [];
                const tagsEl = $(el).find('.node__topics a');
                tagsEl.each((i: number, tagEl) => {
                    tags.push($(tagEl).text());
                });

                quotes.push({
                    quote,
                    tags,
                });
            });
            return quotes;
        } catch (errors: unknown) {
            throw new Error('Error While Parsing URL');
        }
    }
}
