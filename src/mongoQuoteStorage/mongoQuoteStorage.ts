import mongoose from 'mongoose';

import quoteSchema from './schema';

class MongoQuoteStorage implements QuoteStorage {
    private db: mongoose.Connection;
    private QuoteModel;

    constructor() {
        const mongoHost = process.env.MONGO_HOST || 'mongodb';
        const mongoPort = process.env.MONGO_PORT || '27017';
        const mongoUri = `mongodb://${mongoHost}:${mongoPort}/${process.env.TELEGRAM_QUOTE_BOT_APP_DB}`;

        mongoose
            .connect(mongoUri, {
                user: process.env.TELEGRAM_QUOTE_BOT_APP_USERNAME,
                pass: process.env.TELEGRAM_QUOTE_BOT_APP_PASSWORD,
                authSource: 'admin',
                retryWrites: true,
                w: 'majority',
            })
            .catch((err) => {
                console.error('Failed to connect to MongoDB:', err);
                process.exit(1);
            });

        this.db = mongoose.connection;
        this.db.on('error', (error) => {
            console.error('MongoDB connection error:', error);
        });
        this.db.once('open', function () {
            console.log('Connected successfully to MongoDB');
        });

        this.QuoteModel = mongoose.model<QuoteEntity>('Quote', quoteSchema);
    }

    addQuote(quote: Quote): void {
        const quoteEntity = new this.QuoteModel({ ...quote, createdAt: Date.now() });
        quoteEntity.save((err) => {
            if (err) {
                console.log(err);
            }
        });
    }

    addQuotes(quotes: Quote[]): void {
        this.QuoteModel.insertMany(
            quotes.map((quote) => ({ ...quote, createdAt: Date.now() })),
            { ordered: false }
        )
            .then(() => {
                console.log(`${quotes.length} Quotes Added`);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    async findRandomQuoteByTags(tags: string[]): Promise<Quote | undefined> {
        try {
            const quotes = await this.QuoteModel.aggregate<Quote | undefined>([
                { $match: { tags: { $in: tags } } },
                { $sample: { size: 1 } },
            ]);
            return quotes[0];
        } catch (error) {
            console.log(error);
        }
    }

    async findRandomQuoteByWord(word: string): Promise<Quote | undefined> {
        try {
            const quotes = await this.QuoteModel.aggregate<Quote | undefined>([
                { $match: { quote: { $regex: new RegExp(`${word}`), $options: 'i' } } },
                { $sample: { size: 1 } },
            ]);
            return quotes[0];
        } catch (error) {
            console.log(error);
        }
    }

    async findQuotesByTags(tags: string[]): Promise<Quote[]> {
        try {
            const quotes = await this.QuoteModel.find({ tags: { $in: tags } });
            return quotes;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async findQuotesByWord(word: string): Promise<Quote[]> {
        try {
            const quotes = await this.QuoteModel.find({ quote: { $regex: new RegExp(`${word}`), $options: 'i' } });
            return quotes;
        } catch (error) {
            console.log(error);
            return [];
        }
    }
}

export default MongoQuoteStorage;
