"use client";

import { Coin } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface CryptoChartProps {
  coin: Coin;
}

export default function CryptoChart({ coin }: CryptoChartProps) {
  const isPositive = coin.price_change_percentage_24h >= 0;
  const color = isPositive ? "#22c55e" : "#ef4444";

  const data = coin.sparkline_in_7d.price.map((price, index) => ({
    index,
    price: parseFloat(price.toFixed(2)),
  }));

  const formatPrice = (price: number) => {
    if (price >= 1)
      return `$${price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    return `$${price.toFixed(6)}`;
  };

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={coin.image}
              alt={coin.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <CardTitle className="text-white text-lg">{coin.name}</CardTitle>
              <p className="text-slate-400 text-sm uppercase">{coin.symbol}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-white font-bold text-2xl">
              {formatPrice(coin.current_price)}
            </p>
            <p
              className={`text-sm font-medium ${isPositive ? "text-green-400" : "text-red-400"}`}
            >
              {isPositive ? "+" : ""}
              {coin.price_change_percentage_24h.toFixed(2)}% (24h)
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <p className="text-slate-400 text-xs">Máximo 24h</p>
            <p className="text-white font-medium text-sm">
              {formatPrice(coin.high_24h)}
            </p>
          </div>
          <div>
            <p className="text-slate-400 text-xs">Mínimo 24h</p>
            <p className="text-white font-medium text-sm">
              {formatPrice(coin.low_24h)}
            </p>
          </div>
          <div>
            <p className="text-slate-400 text-xs">Volumen 24h</p>
            <p className="text-white font-medium text-sm">
              ${(coin.total_volume / 1e9).toFixed(2)}B
            </p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="index" hide />
            <YAxis domain={["auto", "auto"]} hide />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "1px solid #334155",
                borderRadius: "8px",
              }}
              labelStyle={{ display: "none" }}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke={color}
              strokeWidth={2}
              fill="url(#colorPrice)"
            />
          </AreaChart>
        </ResponsiveContainer>
        <p className="text-slate-500 text-xs text-center mt-2">
          Precio últimos 7 días
        </p>
      </CardContent>
    </Card>
  );
}
