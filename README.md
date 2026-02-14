# On-Chain Analytics

Solana token holder analysis, whale tracking, and smart money flows.

## 🚀 Features

- **Whale Tracking**: Monitor large wallet movements
- **Smart Money Analysis**: Identify profitable traders
- **Performance Leaderboard**: Top traders ranked by profit
- **REST API**: Easy integration with dashboards

## 🛠️ Tech Stack

- TypeScript
- Express.js API
- Solana Web3.js
- Helius SDK

## 📡 API Endpoints

```
GET /api/whales/:tokenMint       - Get whale wallets for token
GET /api/wallet/:address/activity - Get wallet transaction history
GET /api/wallet/:address/performance - Analyze trading performance
GET /api/leaderboard              - Get top performing wallets
```

## 🔧 Development

```bash
npm install
npm run dev
```

API runs on http://localhost:3002

## 🌐 Deployment

```bash
npm run build
npm start
```

## 🔒 Security

Pre-commit hooks active. No secrets committed.

## 📄 License

MIT
