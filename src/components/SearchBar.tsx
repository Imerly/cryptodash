"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
      <Input
        placeholder="Buscar cripto..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-9 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 w-64"
      />
    </div>
  );
}
