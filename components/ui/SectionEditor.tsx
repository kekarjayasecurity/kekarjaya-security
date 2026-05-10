"use client";

import Button from "./Button";
import IconPicker from "./IconPicker";

interface SectionItem {
  [key: string]: string | number;
}

interface FieldConfig {
  key: string;
  label: string;
  type: "text" | "textarea" | "icon";
  placeholder?: string;
}

interface SectionEditorProps {
  label: string;
  fields: FieldConfig[];
  items: SectionItem[];
  onChange: (items: SectionItem[]) => void;
}

export function SectionListEditor({ label, fields, items, onChange }: SectionEditorProps) {
  const addItem = () => {
    const newItem: SectionItem = {};
    fields.forEach((f) => {
      newItem[f.key] = "";
    });
    onChange([...items, newItem]);
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, key: string, value: string) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [key]: value };
    onChange(updated);
  };

  const moveItem = (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= items.length) return;
    const updated = [...items];
    const temp = updated[newIndex];
    updated[newIndex] = updated[index];
    updated[index] = temp;
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-gray-800">{label}</h4>
        <Button variant="outline" size="sm" onClick={addItem}>
          + Tambah
        </Button>
      </div>
      {items.length === 0 && (
        <p className="text-gray-400 text-sm italic">Belum ada item. Klik &quot;Tambah&quot; untuk menambahkan.</p>
      )}
      {items.map((item, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3 bg-gray-50">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500">#{index + 1}</span>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => moveItem(index, "up")}
                disabled={index === 0}
                className="text-gray-400 hover:text-gray-600 disabled:opacity-30 text-sm px-1"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => moveItem(index, "down")}
                disabled={index === items.length - 1}
                className="text-gray-400 hover:text-gray-600 disabled:opacity-30 text-sm px-1"
              >
                ↓
              </button>
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="text-red-400 hover:text-red-600 text-sm px-1"
              >
                ✕
              </button>
            </div>
          </div>
          {fields.map((field) => (
            <div key={field.key}>
              {field.type === "icon" ? (
                <IconPicker
                  label={field.label}
                  value={(item[field.key] as string) || ""}
                  onChange={(val) => updateItem(index, field.key, val)}
                />
              ) : field.type === "textarea" ? (
                <>
                  <label className="block text-xs font-medium text-gray-600 mb-1">{field.label}</label>
                  <textarea
                    value={(item[field.key] as string) || ""}
                    onChange={(e) => updateItem(index, field.key, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent text-sm"
                    rows={3}
                  />
                </>
              ) : (
                <>
                  <label className="block text-xs font-medium text-gray-600 mb-1">{field.label}</label>
                  <input
                    type="text"
                    value={(item[field.key] as string) || ""}
                    onChange={(e) => updateItem(index, field.key, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent text-sm"
                  />
                </>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

interface TextListEditorProps {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
}

export function TextListEditor({ label, items, onChange, placeholder }: TextListEditorProps) {
  const addItem = () => {
    onChange([...items, ""]);
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, value: string) => {
    const updated = [...items];
    updated[index] = value;
    onChange(updated);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-gray-800">{label}</h4>
        <Button variant="outline" size="sm" onClick={addItem}>
          + Tambah
        </Button>
      </div>
      {items.length === 0 && (
        <p className="text-gray-400 text-sm italic">Belum ada item. Klik &quot;Tambah&quot; untuk menambahkan.</p>
      )}
      {items.map((item, index) => (
        <div key={index} className="flex gap-2 items-center">
          <input
            type="text"
            value={item}
            onChange={(e) => updateItem(index, e.target.value)}
            placeholder={placeholder}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent text-sm"
          />
          <button
            type="button"
            onClick={() => removeItem(index)}
            className="text-red-400 hover:text-red-600 text-sm px-2"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}