import express, { Request, Response } from 'express';
import { WhaleTracker } from './whale-tracker';
import { SmartMoneyAnalyzer } from './smart-money';

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(express.json());

// Initialize analyzers
const rpcUrl = process.env.SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com';
const whaleTracker = new WhaleTracker(rpcUrl);
const smartMoneyAnalyzer = new SmartMoneyAnalyzer(rpcUrl);

// Routes
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/whales/:tokenMint', async (req: Request, res: Response) => {
  try {
    const { tokenMint } = req.params;
    const whales = await whaleTracker.scanForWhales(tokenMint as string);
    res.json({ tokenMint, whales });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch whale data' });
  }
});

app.get('/api/wallet/:address/activity', async (req: Request, res: Response) => {
  try {
    const { address } = req.params;
    const limit = parseInt(req.query.limit as string) || 50;
    const activity = await whaleTracker.getWalletActivity(address as string, limit);
    res.json({ address, activity });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch wallet activity' });
  }
});

app.get('/api/wallet/:address/performance', async (req: Request, res: Response) => {
  try {
    const { address } = req.params;
    const days = parseInt(req.query.days as string) || 30;
    const performance = await smartMoneyAnalyzer.analyzeWalletPerformance(address as string, days);
    res.json({ address, performance });
  } catch (error) {
    res.status(500).json({ error: 'Failed to analyze wallet performance' });
  }
});

app.get('/api/leaderboard', async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const leaderboard = await smartMoneyAnalyzer.getTopPerformers(limit);
    res.json({ leaderboard });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`On-Chain Analytics API running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});