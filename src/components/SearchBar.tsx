"use client";

import { RiSearchLine } from "react-icons/ri";

interface Props {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder = "Search tracks…" }: Props) {
  return (
    <div className="relative">
      <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-lg" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-navy border border-white/10 rounded-full pl-10 pr-4 py-2.5 text-sm text-cream placeholder:text-muted focus:outline-none focus:border-gold/50 transition-colors"
      />
    </div>
  );
}
