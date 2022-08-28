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
  const chatId = msg.chat.id;
  let quote;
  if (match) {
    quote = await quoteStorage.findRandomQuoteByWord(match[1]);
    quote = quote?.quote || "Цитата не найдена :(";
  } else {
    quote = "Введите поисковой запрос";
  }

  bot.sendMessage(chatId, quote);
});
