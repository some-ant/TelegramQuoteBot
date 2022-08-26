import axios from "axios";
import cheerio from "cheerio";

import type { Quote, QuoteScrapper } from "./types";

class QuoteScrapperImpl implements QuoteScrapper {
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  async scrapeQuotes(): Promise<Quote[]> {
    try {
      const quotes: Quote[] = [];
      const { data } = await axios.get(this.url);
      const $ = cheerio.load(data);
      const articles = $("article");

      articles.each((_, el) => {
        let quote = $(el).find(".field-name-body p").text();

        const tags: string[] = [];
        const tagsEl = $(el).find(".node__topics a");
        tagsEl.each((_, tagEl) => {
          tags.push($(tagEl).text());
        });

        quotes.push({
          quote,
          tags,
        });
      });
      return quotes;
    } catch (errors: any) {
      throw new Error(errors);
    }
  }
}

export default QuoteScrapperImpl;
