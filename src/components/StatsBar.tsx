"use client";

import { Coin } from "@/lib/types";

interface StatsBarProps {
  coins: Coin[];
}

export default function StatsBar({ coins }: StatsBarProps) {
  const gainers = coins.filter((c) => c.price_change_percentage_24h > 0).length;
  const losers = coins.filter((c) => c.price_change_percentage_24h < 0).length;
  const avgChange =
    coins.reduce((acc, c) => acc + c.price_change_percentage_24h, 0) /
    coins.length;
  const totalVolume = coins.reduce((acc, c) => acc + c.total_volume, 0);

  const formatVolume = (vol: number) => {
    if (vol >= 1e12) return `$${(vol / 1e12).toFixed(2)}T`;
    if (vol >= 1e9) return `$${(vol / 1e9).toFixed(2)}B`;
    return `$${(vol / 1e6).toFixed(2)}M`;
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
        <p className="text-slate-400 text-xs mb-1">Total criptos</p>
        <p className="text-white font-bold text-xl">{coins.length}</p>
      </div>
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
        <p className="text-slate-400 text-xs mb-1">En alza 📈</p>
        <p className="text-green-400 font-bold text-xl">{gainers}</p>
      </div>
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
        <p className="text-slate-400 text-xs mb-1">En baja 📉</p>
        <p className="text-red-400 font-bold text-xl">{losers}</p>
      </div>
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
        <p className="text-slate-400 text-xs mb-1">Volumen total 24h</p>
        <p className="text-white font-bold text-xl">
          {formatVolume(totalVolume)}
        </p>
      </div>
    </div>
  );
}
