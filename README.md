# TelegramQuoteBot

This repository scrappes life quotes from a website. Stores them in MongoDB. And finally, listening to request to your bot and finds relevant quote to send.
You can also add this bot to a public chat.

**Link to existing bot:** https://t.me/LifeQuotesBot

---

## How to create your own bot 

1. Register your bot at Telegram and get `API_KEY`
2. Create a MongoDB to store scrapped quotes
3. Clone the repo
4. Add these variables to your `.env` file:<br/>
`TELEGRAM_QUOTE_BOT_APP_TOKEN=...` <br/>
`TELEGRAM_QUOTE_BOT_APP_USERNAME=...`<br/>
`TELEGRAM_QUOTE_BOT_APP_PASSWORD=...`<br/>
`TELEGRAM_QUOTE_BOT_APP_DB=...`<br/>
5. Run `npm run scrape` to scrape and save the qoutes
6. Run `npm run bot` to start listening on messages to your bot with `TELEGRAM_QUOTE_BOT_APP_TOKEN`. Alternatively, you can create a Docker image and run container on your PC or services like AWS ECS 

---
## Commands for bot in Telegram

- /byword *text* => Will send you a random quote that contains *text*
- /love => /byword любовь
- /friendship => /byword друж
- /meaningful => /byword жизнь
- /man => /byword мужчины
- /woman => /byword женщины

