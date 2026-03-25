"use client";

import { useState, useEffect, useCallback } from "react";
import { Coin } from "@/lib/types";
import CryptoCard from "@/components/CryptoCard";
import CryptoChart from "@/components/CryptoChart";
import SearchBar from "@/components/SearchBar";
import StatsBar from "@/components/StatsBar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "gainers" | "losers">("all");
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchCoins = useCallback(async () => {
    try {
      const response = await fetch("/api/crypto");
      const data = await response.json();
      setCoins(data);
      setLastUpdated(new Date());
      if (!selectedCoin && data.length > 0) {
        setSelectedCoin(data[0]);
      } else if (selectedCoin) {
        const updated = data.find((c: Coin) => c.id === selectedCoin.id);
        if (updated) setSelectedCoin(updated);
      }
    } catch (error) {
      console.error("Error fetching coins:", error);
    } finally {
      setLoading(false);
    }
  }, [selectedCoin]);

  useEffect(() => {
    fetchCoins();
    const interval = setInterval(fetchCoins, 30000);
    return () => clearInterval(interval);
  }, []);

  const filteredCoins = coins
    .filter((c) => {
      if (filter === "gainers") return c.price_change_percentage_24h > 0;
      if (filter === "losers") return c.price_change_percentage_24h < 0;
      return true;
    })
    .filter(
      (c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.symbol.toLowerCase().includes(search.toLowerCase()),
    );

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white">CryptoDash</h1>
            <p className="text-slate-400 text-sm mt-1">
              {lastUpdated
                ? `Actualizado: ${lastUpdated.toLocaleTimeString("es-AR")}`
                : "Cargando..."}
            </p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <SearchBar value={search} onChange={setSearch} />
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => setFilter("all")}
                className={
                  filter === "all"
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                    : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                }
              >
                Todos
              </Button>
              <Button
                size="sm"
                onClick={() => setFilter("gainers")}
                className={
                  filter === "gainers"
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                }
              >
                En alza
              </Button>
              <Button
                size="sm"
                onClick={() => setFilter("losers")}
                className={
                  filter === "losers"
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                }
              >
                En baja
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        {!loading && coins.length > 0 && <StatsBar coins={coins} />}

        {/* Main grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
          {/* Coin list */}
          <div className="xl:col-span-1 grid grid-cols-1 gap-3 max-h-[600px] overflow-y-auto pr-1">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-24 bg-slate-700" />
              ))
            ) : filteredCoins.length === 0 ? (
              <p className="text-slate-400 text-center py-8">
                No se encontraron resultados
              </p>
            ) : (
              filteredCoins.map((coin) => (
                <CryptoCard
                  key={coin.id}
                  coin={coin}
                  onClick={setSelectedCoin}
                  selected={selectedCoin?.id === coin.id}
                />
              ))
            )}
          </div>

          {/* Chart */}
          <div className="xl:col-span-2">
            {loading ? (
              <Skeleton className="h-96 bg-slate-700" />
            ) : selectedCoin ? (
              <CryptoChart coin={selectedCoin} />
            ) : null}
          </div>
        </div>
      </div>
    </main>
  );
}
