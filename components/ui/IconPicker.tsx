"use client";

import { useState, useRef, useEffect } from "react";
import { ICON_REGISTRY, getIconPath } from "@/lib/icons";

interface IconPickerProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export default function IconPicker({ value, onChange, label }: IconPickerProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = ICON_REGISTRY.filter(
    (i) =>
      i.name.toLowerCase().includes(search.toLowerCase()) ||
      i.label.toLowerCase().includes(search.toLowerCase())
  );

  const selectedPath = getIconPath(value);

  return (
    <div ref={ref} className="relative">
      {label && (
        <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      )}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:border-accent-500 transition-colors text-sm text-left"
      >
        {selectedPath ? (
          <svg className="w-5 h-5 text-primary-700 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={selectedPath} />
          </svg>
        ) : (
          <div className="w-5 h-5 border border-dashed border-gray-300 rounded shrink-0" />
        )}
        <span className={value ? "text-gray-700" : "text-gray-400"}>
          {getLabel(value) || "Pilih ikon..."}
        </span>
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-hidden flex flex-col">
          <div className="p-2 border-b border-gray-100">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari ikon..."
              className="w-full px-3 py-1.5 border border-gray-200 rounded-md text-sm outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
              autoFocus
            />
          </div>
          <div className="overflow-y-auto p-2 grid grid-cols-4 gap-1">
            {filtered.map((icon) => (
              <button
                key={icon.name}
                type="button"
                onClick={() => {
                  onChange(icon.name);
                  setOpen(false);
                  setSearch("");
                }}
                className={`flex flex-col items-center p-2 rounded-md text-xs transition-colors ${
                  value === icon.name
                    ? "bg-accent-100 text-accent-700 ring-1 ring-accent-500"
                    : "hover:bg-gray-50 text-gray-600"
                }`}
                title={icon.label}
              >
                <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon.path} />
                </svg>
                <span className="truncate w-full text-center text-[10px]">{icon.label}</span>
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="col-span-4 text-xs text-gray-400 text-center py-4">Tidak ada ikon ditemukan</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function getLabel(name: string): string | undefined {
  return ICON_REGISTRY.find((i) => i.name === name)?.label;
}