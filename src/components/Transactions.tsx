import React, { useState, useMemo } from 'react';
import { FileText, ArrowUpRight, ArrowDownLeft, Calendar, Search, CheckCircle, Clock } from 'lucide-react';
import { Transaction } from '../types';

const TRANSACTIONS: Transaction[] = [
  {
    id: 'TX-90281',
    date: 'Jun 24, 2026',
    merchant: 'Starbucks Specialty Roast',
    points: 150,
    type: 'credit',
    status: 'Completed',
    amount: '$14.50',
    category: 'Food & Beverage'
  },
  {
    id: 'TX-44029',
    date: 'Jun 22, 2026',
    merchant: 'Apple Premium Authorized Reseller',
    points: 450,
    type: 'credit',
    status: 'Completed',
    amount: '$89.00',
    category: 'Electronics'
  },
  {
    id: 'TX-55102',
    date: 'Jun 15, 2026',
    merchant: 'Noise-Cancelling Headphones Redemption',
    points: 6500,
    type: 'redemption',
    status: 'Completed',
    amount: '0.00 PTS',
    category: 'Tech Claim'
  },
  {
    id: 'TX-12891',
    date: 'Jun 10, 2026',
    merchant: 'Adidas Sports Flagship',
    points: 320,
    type: 'credit',
    status: 'Completed',
    amount: '$64.00',
    category: 'Apparel'
  },
  {
    id: 'TX-09381',
    date: 'Jun 04, 2026',
    merchant: 'Zara Fashion Outlets',
    points: 200,
    type: 'credit',
    status: 'Completed',
    amount: '$40.00',
    category: 'Apparel'
  },
  {
    id: 'TX-99042',
    date: 'May 28, 2026',
    merchant: 'Starbucks Digital Voucher Redemption',
    points: 1500,
    type: 'redemption',
    status: 'Completed',
    amount: '0.00 PTS',
    category: 'Voucher Claim'
  },
  {
    id: 'TX-77291',
    date: 'May 22, 2026',
    merchant: 'Amazon Prime Day Scanned Invoice',
    points: 500,
    type: 'credit',
    status: 'Pending',
    amount: '$100.00',
    category: 'General Retail'
  }
];

export default function Transactions() {
  const [filter, setFilter] = useState<'all' | 'credit' | 'redemption'>('all');
  const [search, setSearch] = useState('');

  const filteredTx = useMemo(() => {
    return TRANSACTIONS.filter((tx) => {
      const matchesFilter = filter === 'all' || tx.type === filter;
      const matchesSearch = tx.merchant.toLowerCase().includes(search.toLowerCase()) || 
                            tx.id.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [filter, search]);

  return (
    <section id="transactions" className="py-24 bg-[#0F172A] border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-[#D4AF37] text-xs font-mono font-bold uppercase mb-4 backdrop-blur-md">
            <FileText className="h-3.5 w-3.5 text-[#D4AF37]" /> Receipt Auditing
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Transaction & Invoice History
          </h2>
          <p className="text-white/60 mt-4 text-base font-sans font-light">
            Review detailed audits of point credits uploaded via receipt scans and reward points redeemed within your Fegno profile.
          </p>
        </div>

        {/* Dashboard Frame */}
        <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-md">
          
          {/* Dashboard Control Bar */}
          <div className="p-5 border-b border-white/10 flex flex-col md:flex-row gap-4 items-center justify-between bg-white/5 backdrop-blur-md">
            
            {/* Filter buttons */}
            <div className="flex gap-1.5 p-1 bg-white/5 rounded-xl border border-white/5">
              <button
                id="tx-filter-all"
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  filter === 'all' ? 'bg-[#D4AF37] text-slate-950' : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                All Transactions
              </button>
              <button
                id="tx-filter-credit"
                onClick={() => setFilter('credit')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  filter === 'credit' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <ArrowUpRight className="h-3.5 w-3.5" /> Credits (+)
              </button>
              <button
                id="tx-filter-redemption"
                onClick={() => setFilter('redemption')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  filter === 'redemption' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <ArrowDownLeft className="h-3.5 w-3.5" /> Claims (-)
              </button>
            </div>

            {/* Live Search */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-white/40 h-4 w-4" />
              <input
                type="text"
                id="tx-search-input"
                placeholder="Search transactions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/5 border border-white/5 rounded-xl py-2 pl-10 pr-4 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF37]/50 transition-all"
              />
            </div>

          </div>

          {/* Transactions List */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 text-[10px] font-mono text-white/40 uppercase">
                  <th className="py-4 px-6">ID / Date</th>
                  <th className="py-4 px-6">Merchant & Category</th>
                  <th className="py-4 px-6">Points Ledger</th>
                  <th className="py-4 px-6">Original Invoice</th>
                  <th className="py-4 px-6 text-right">Receipt Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs font-sans">
                {filteredTx.length > 0 ? (
                  filteredTx.map((tx) => (
                    <tr
                      key={tx.id}
                      className="transition-colors group"
                    >
                      {/* ID & Date */}
                      <td className="py-5 px-6">
                        <div className="font-mono font-bold text-white/80 group-hover:text-[#D4AF37] transition-colors">{tx.id}</div>
                        <div className="text-[10px] text-white/40 mt-0.5 flex items-center gap-1">
                          <Calendar className="h-3 w-3" /> {tx.date}
                        </div>
                      </td>

                      {/* Merchant */}
                      <td className="py-5 px-6">
                        <p className="font-bold text-white">{tx.merchant}</p>
                        <p className="text-[10px] text-white/40 mt-0.5">{tx.category}</p>
                      </td>

                      {/* Points Ledger */}
                      <td className="py-5 px-6 font-mono">
                        {tx.type === 'credit' ? (
                          <span className="text-green-400 font-bold flex items-center gap-1">
                            <ArrowUpRight className="h-3.5 w-3.5" /> +{tx.points.toLocaleString()} PTS
                          </span>
                        ) : (
                          <span className="text-red-400 font-bold flex items-center gap-1">
                            <ArrowDownLeft className="h-3.5 w-3.5" /> -{tx.points.toLocaleString()} PTS
                          </span>
                        )}
                      </td>

                      {/* Original Invoice Value */}
                      <td className="py-5 px-6 font-mono text-white/75">
                        {tx.amount}
                      </td>

                      {/* Status */}
                      <td className="py-5 px-6 text-right">
                        <span className={`inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full ${
                          tx.status === 'Completed'
                            ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}>
                          {tx.status === 'Completed' ? <CheckCircle className="h-3 w-3" /> : <Clock className="h-3 w-3 animate-pulse" />}
                          {tx.status}
                        </span>
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-12 text-center text-white/30 font-mono">
                      No transaction history found matching search criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>

      </div>

    </section>
  );
}
