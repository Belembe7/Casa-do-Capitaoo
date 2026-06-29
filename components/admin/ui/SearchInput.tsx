'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounce?: number;
}

export default function SearchInput({
  value,
  onChange,
  placeholder = 'Pesquisar...',
  debounce = 300,
}: SearchInputProps) {
  const [local, setLocal] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => onChange(local), debounce);
    return () => clearTimeout(timer);
  }, [local, debounce, onChange]);

  useEffect(() => setLocal(value), [value]);

  return (
    <div className="relative">
      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--admin-text-muted)]" />
      <input
        type="search"
        value={local}
        onChange={(e) => setLocal(e.target.value)}
        placeholder={placeholder}
        className="admin-input pl-9"
      />
    </div>
  );
}
