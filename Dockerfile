FROM oven/bun:latest

WORKDIR /app

COPY . .

CMD ["bun", "bot"]
