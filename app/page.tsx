'use client';

import { useState, useEffect } from 'react';

interface Whale {
  address: string;
  balance: number;
  change: number;
  lastActivity: string;
}

export default function AnalyticsDashboard() {
  const [whales, setWhales] = useState<Whale[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading whale data
    setTimeout(() => {
      setWhales([
        { address: '7nY7H', balance: 2500000, change: 5.2, lastActivity: '2m ago' },
        { address: '3xK9P', balance: 1800000, change: -2.1, lastActivity: '5m ago' },
        { address: '9mQ2R', balance: 1200000, change: 12.5, lastActivity: '12m ago' },
        { address: '5vL8N', balance: 950000, change: -0.8, lastActivity: '15m ago' },
        { address: '2pJ4W', balance: 820000, change: 3.4, lastActivity: '22m ago' },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">On-Chain Analytics</h1>
          <p className="text-slate-400">Solana whale tracking and smart money flows</p>
          <div className="inline-flex items-center gap-2 mt-4 px-3 py-1 rounded-full text-sm bg-green-500/20 text-green-400">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Live
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard title="Whales Tracked" value="1,247" change="+12" color="blue" />
          <StatCard title="Smart Money Flow" value="$2.4M" change="+8.3%" color="green" />
          <StatCard title="Active Wallets" value="45.2K" change="+5.1%" color="purple" />
          <StatCard title="Avg Position" value="$18.5K" change="-2.4%" color="orange" />
        </div>

        <div className="bg-slate-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">🐋 Top Whales</h2>
          {loading ? (
            <p className="text-slate-400">Loading whale data...</p>
          ) : (
            <div className="space-y-3">
              {whales.map((whale, i) => (
                <WhaleRow key={i} rank={i + 1} whale={whale} />
              ))}
            </div>
          )}
        </div>

        <footer className="mt-12 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
          <p>Built by Kira • Updated Feb 14, 2026 • Lunar New Year Launch in 3 days</p>
        </footer>
      </div>
    </div>
  );
}

function StatCard({ title, value, change, color }: { title: string; value: string; change: string; color: string }) {
  const colors: Record<string, string> = {
    blue: 'bg-blue-500/10 border-blue-500/20',
    green: 'bg-green-500/10 border-green-500/20',
    purple: 'bg-purple-500/10 border-purple-500/20',
    orange: 'bg-orange-500/10 border-orange-500/20',
  };

  return (
    <div className={`p-6 rounded-lg border ${colors[color]}`}>
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-slate-400 text-sm">{title}</div>
      <div className={`text-sm mt-2 ${change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
        {change} today
      </div>
    </div>
  );
}

function WhaleRow({ rank, whale }: { rank: number; whale: Whale }) {
  return (
    <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
      <div className="flex items-center gap-4">
        <span className="text-slate-500 font-mono w-8">#{rank}</span>
        <div>
          <p className="font-mono text-sm">{whale.address}...{whale.address.slice(-4)}</p>
          <p className="text-xs text-slate-400">{whale.lastActivity}</p>
        </div>
      </div>
      <div className="text-right">
        <div className="font-medium">{whale.balance.toLocaleString()} SOL</div>
        <div className={`text-sm ${whale.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
          {whale.change >= 0 ? '+' : ''}{whale.change}%
        </div>
      </div>
    </div>
  );
}
