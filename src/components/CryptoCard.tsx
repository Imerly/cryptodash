"use client";

import { Coin } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparklines, SparklinesLine } from "react-sparklines";

interface CryptoCardProps {
  coin: Coin;
  onClick: (coin: Coin) => void;
  selected: boolean;
}

export default function CryptoCard({
  coin,
  onClick,
  selected,
}: CryptoCardProps) {
  const isPositive = coin.price_change_percentage_24h >= 0;

  const formatPrice = (price: number) => {
    if (price >= 1)
      return `$${price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    return `$${price.toFixed(6)}`;
  };

  const formatMarketCap = (cap: number) => {
    if (cap >= 1e12) return `$${(cap / 1e12).toFixed(2)}T`;
    if (cap >= 1e9) return `$${(cap / 1e9).toFixed(2)}B`;
    if (cap >= 1e6) return `$${(cap / 1e6).toFixed(2)}M`;
    return `$${cap.toLocaleString()}`;
  };

  return (
    <Card
      onClick={() => onClick(coin)}
      className={`cursor-pointer transition-all hover:border-emerald-500 bg-slate-800 border-slate-700 ${selected ? "border-emerald-500 ring-1 ring-emerald-500" : ""}`}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <img
              src={coin.image}
              alt={coin.name}
              className="w-8 h-8 rounded-full"
            />
            <div>
              <p className="text-white font-medium text-sm">{coin.name}</p>
              <p className="text-slate-400 text-xs uppercase">{coin.symbol}</p>
            </div>
          </div>
          <Badge
            className={
              isPositive
                ? "bg-green-500/20 text-green-400 border-green-500/30"
                : "bg-red-500/20 text-red-400 border-red-500/30"
            }
          >
            {isPositive ? "+" : ""}
            {coin.price_change_percentage_24h.toFixed(2)}%
          </Badge>
        </div>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-white font-bold">
              {formatPrice(coin.current_price)}
            </p>
            <p className="text-slate-400 text-xs">
              Cap: {formatMarketCap(coin.market_cap)}
            </p>
          </div>
          <div className="w-20 h-10">
            <Sparklines data={coin.sparkline_in_7d.price.slice(-20)}>
              <SparklinesLine color={isPositive ? "#22c55e" : "#ef4444"} />
            </Sparklines>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
