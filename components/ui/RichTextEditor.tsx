"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
}

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({ openOnClick: false }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <div className="flex flex-wrap gap-1 p-2 bg-gray-50 border-b">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-2 py-1 rounded text-sm ${editor.isActive("bold") ? "bg-primary-700 text-white" : "hover:bg-gray-200"}`}
        >
          B
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-2 py-1 rounded text-sm ${editor.isActive("italic") ? "bg-primary-700 text-white" : "hover:bg-gray-200"}`}
        >
          <em>I</em>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-2 py-1 rounded text-sm ${editor.isActive("heading", { level: 2 }) ? "bg-primary-700 text-white" : "hover:bg-gray-200"}`}
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`px-2 py-1 rounded text-sm ${editor.isActive("heading", { level: 3 }) ? "bg-primary-700 text-white" : "hover:bg-gray-200"}`}
        >
          H3
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-2 py-1 rounded text-sm ${editor.isActive("bulletList") ? "bg-primary-700 text-white" : "hover:bg-gray-200"}`}
        >
          UL
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-2 py-1 rounded text-sm ${editor.isActive("orderedList") ? "bg-primary-700 text-white" : "hover:bg-gray-200"}`}
        >
          OL
        </button>
        <span className="w-px h-5 bg-gray-300 mx-1 self-center" />
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={`px-2 py-1 rounded text-sm ${editor.isActive({ textAlign: "left" }) ? "bg-primary-700 text-white" : "hover:bg-gray-200"}`}
          title="Rata Kiri"
        >
          &#x2190;
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={`px-2 py-1 rounded text-sm ${editor.isActive({ textAlign: "center" }) ? "bg-primary-700 text-white" : "hover:bg-gray-200"}`}
          title="Rata Tengah"
        >
          &#x2194;
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={`px-2 py-1 rounded text-sm ${editor.isActive({ textAlign: "right" }) ? "bg-primary-700 text-white" : "hover:bg-gray-200"}`}
          title="Rata Kanan"
        >
          &#x2192;
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          className={`px-2 py-1 rounded text-sm ${editor.isActive({ textAlign: "justify" }) ? "bg-primary-700 text-white" : "hover:bg-gray-200"}`}
          title="Rata Kanan Kiri"
        >
          &#x21C4;
        </button>
      </div>
      <EditorContent editor={editor} className="prose max-w-none p-4 min-h-[300px]" />
    </div>
  );
}
