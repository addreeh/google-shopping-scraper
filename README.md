# 🕵️ Google Shopping Scraper

TypeScript script to retrieve product prices from Google Shopping efficiently.

## Features

- Scrape prices by product ID
- TypeScript implementation
- Simple and fast
- Minimal dependencies
- Handles multiple product lookups

## Prerequisites

- Node.js
- npm/yarn
- TypeScript

## Installation

```bash
git clone https://github.com/addreeh/google-shopping-scraper
npm install
```

## Usage

```typescript
import { scrapeGoogleShoppingPrice } from './scraper';

const productId = 'your_product_id';
const price = await scrapeGoogleShoppingPrice(productId);
```

## Configuration

Customize scraping settings in `config.ts`.

## Contributing

PRs welcome. Open an issue first.

## License

MIT License
