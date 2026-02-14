import express from 'express';
import { WhaleTracker } from './whale-tracker';
import { SmartMoneyAnalyzer } from './smart-money';

const app = express();
app.use(express.json());

const RPC_URL = process.env.SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com';
const whaleTracker = new WhaleTracker(RPC_URL);
const smartMoney = new SmartMoneyAnalyzer(RPC_URL);

// Get whale wallets for a token
app.get('/api/whales/:tokenMint', async (req, res) => {
  try {
    const { tokenMint } = req.params;
    const whales = await whaleTracker.scanForWhales(tokenMint);
    res.json({ success: true, whales });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get wallet activity
app.get('/api/wallet/:address/activity', async (req, res) => {
  try {
    const { address } = req.params;
    const activity = await whaleTracker.getWalletActivity(address);
    res.json({ success: true, activity });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Analyze wallet performance
app.get('/api/wallet/:address/performance', async (req, res) => {
  try {
    const { address } = req.params;
    const days = parseInt(req.query.days as string) || 30;
    const performance = await smartMoney.analyzeWalletPerformance(address, days);
    res.json({ success: true, performance });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get top performers
app.get('/api/leaderboard', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const leaders = await smartMoney.getTopPerformers(limit);
    res.json({ success: true, leaderboard: leaders });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`On-chain analytics API running on port ${PORT}`);
});
