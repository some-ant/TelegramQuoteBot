const axios = require("axios");
const cheerio = require("cheerio");
const pretty = require("pretty");

const url = "https://citaty.info/topic/lozh-obman";
const res = [];

async function scrapeData() {
  try {
    const res = [];
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const articles = $("article");
    articles.each((_, el) => {
      let cite = $(el).find(".field-name-body p").text();
      const tags = [];
      let tagsEl = $(el).find(".node__topics a");
      tagsEl.each((_, tagEl) => {
        tags.push($(tagEl).text());
      });

      res.push({
        cite,
        tags,
      });
    });
    return res;
  } catch (errors) {
    console.log(errors);
  }
}

const printCites = (async () => {
  const cites = await scrapeData();
  console.log(cites);
})();
