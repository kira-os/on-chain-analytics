import { Connection, PublicKey } from '@solana/web3.js';

export interface WhaleWallet {
  address: string;
  balance: number;
  lastActivity: number;
  tokens: string[];
}

export class WhaleTracker {
  private connection: Connection;
  private whaleThreshold: number;
  private trackedWallets: Map<string, WhaleWallet> = new Map();

  constructor(rpcUrl: string, whaleThreshold: number = 100000) {
    this.connection = new Connection(rpcUrl);
    this.whaleThreshold = whaleThreshold;
  }

  async scanForWhales(tokenMint: string) {
    // Get all token accounts
    const tokenAccounts = await this.connection.getTokenLargestAccounts(
      new PublicKey(tokenMint)
    );

    const whales: WhaleWallet[] = [];

    for (const account of tokenAccounts.value) {
      const balance = Number(account.amount);
      if (balance >= this.whaleThreshold) {
        const walletInfo: WhaleWallet = {
          address: account.address.toString(),
          balance,
          lastActivity: Date.now(),
          tokens: [tokenMint],
        };
        
        this.trackedWallets.set(account.address.toString(), walletInfo);
        whales.push(walletInfo);
      }
    }

    return whales;
  }

  async getWalletActivity(walletAddress: string, limit: number = 50) {
    const signatures = await this.connection.getSignaturesForAddress(
      new PublicKey(walletAddress),
      { limit }
    );

    return signatures.map(sig => ({
      signature: sig.signature,
      timestamp: sig.blockTime,
      slot: sig.slot,
    }));
  }

  getTrackedWhales() {
    return Array.from(this.trackedWallets.values());
  }
}
