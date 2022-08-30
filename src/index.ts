import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";

import MongoQuoteStorage from "./mongoQuoteStorage";

dotenv.config();

const quoteStorage = new MongoQuoteStorage();

const token = process.env.TELEGRAM_QUOTE_BOT_APP_TOKEN;
if (!token) {
  throw new Error("No Telegram Token Provided");
}
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/byword (.+)/, async (msg, match) => {
  let quote = await quoteStorage.findRandomQuoteByWord(match?.[1] || "").then((res) => res?.quote);
  let resp = quote || "Цитата не найдена :(";
  bot.sendMessage(msg.chat.id, resp);
});

bot.onText(/\/love/, async (msg) => {
  let quote = await quoteStorage.findRandomQuoteByTags(["любовь"]).then((res) => res?.quote);
  let resp = quote || "Цитата не найдена :(";
  bot.sendMessage(msg.chat.id, resp);
});

bot.onText(/\/friendship/, async (msg) => {
  let quote = await quoteStorage.findRandomQuoteByWord("друж").then((res) => res?.quote);
  let resp = quote || "Цитата не найдена :(";
  bot.sendMessage(msg.chat.id, resp);
});

bot.onText(/\/meaningful/, async (msg) => {
  let quote = await quoteStorage.findRandomQuoteByWord("жизнь").then((res) => res?.quote);
  let resp = quote || "Цитата не найдена :(";
  bot.sendMessage(msg.chat.id, resp);
});

bot.onText(/\/man/, async (msg) => {
  let quote = await quoteStorage.findRandomQuoteByTags(["мужчины"]).then((res) => res?.quote);
  let resp = quote || "Цитата не найдена :(";
  bot.sendMessage(msg.chat.id, resp);
});

bot.onText(/\/woman/, async (msg) => {
  let quote = await quoteStorage.findRandomQuoteByTags(["женщины"]).then((res) => res?.quote);
  let resp = quote || "Цитата не найдена :(";
  bot.sendMessage(msg.chat.id, resp);
});

bot.onText(/\/lie/, async (msg) => {
  let quote = await quoteStorage.findRandomQuoteByTags(["ложь"]).then((res) => res?.quote);
  let resp = quote || "Цитата не найдена :(";
  bot.sendMessage(msg.chat.id, resp);
});

bot.onText(/\/fear/, async (msg) => {
  let quote = await quoteStorage.findRandomQuoteByWord("страх").then((res) => res?.quote);
  let resp = quote || "Цитата не найдена :(";
  bot.sendMessage(msg.chat.id, resp);
});
