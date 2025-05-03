"use client";

import { Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  ListOrdered,
  List,
  Code,
  Undo,
  Redo,
  Palette,
  Highlighter as HighlighterCircle,
} from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ColorPicker from "./color-picker";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface ToolbarProps {
  editor: Editor;
}

export default function Toolbar({ editor }: ToolbarProps) {
  if (!editor) {
    return null;
  }

  const setTextAlign = (align: "left" | "center" | "right" | "justify") => {
    editor.chain().focus().setTextAlign(align).run();
  };

  const setHeading = (level: 1 | 2 | 3) => {
    editor.chain().focus().toggleHeading({ level }).run();
  };

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 bg-muted/30 border-b">
      <ToolbarGroup>
        <Toggle
          size="sm"
          pressed={editor.isActive("bold")}
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
          aria-label="Toggle bold"
          title="Bold (Ctrl+B)"
        >
          <Bold className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("italic")}
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
          aria-label="Toggle italic"
          title="Italic (Ctrl+I)"
        >
          <Italic className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("underline")}
          onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
          aria-label="Toggle underline"
          title="Underline (Ctrl+U)"
        >
          <Underline className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("strike")}
          onPressedChange={() => editor.chain().focus().toggleStrike().run()}
          aria-label="Toggle strikethrough"
        >
          <Strikethrough className="h-4 w-4" />
        </Toggle>
      </ToolbarGroup>

      <Separator orientation="vertical" className="h-6" />

      <ToolbarGroup>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 px-2 gap-1">
              <Palette className="h-4 w-4" />
              <span className="sr-only">Text color</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64">
            <ColorPicker editor={editor} type="color" title="Text Color" />
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 px-2 gap-1">
              <HighlighterCircle className="h-4 w-4" />
              <span className="sr-only">Highlight color</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64">
            <ColorPicker
              editor={editor}
              type="highlight"
              title="Highlight Color"
            />
          </PopoverContent>
        </Popover>
      </ToolbarGroup>

      <Separator orientation="vertical" className="h-6" />

      <ToolbarGroup>
        <ToggleGroup type="single" size="sm" value={getAlignValue(editor)}>
          <ToggleGroupItem
            value="left"
            onClick={() => setTextAlign("left")}
            aria-label="Align left"
          >
            <AlignLeft className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="center"
            onClick={() => setTextAlign("center")}
            aria-label="Align center"
          >
            <AlignCenter className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="right"
            onClick={() => setTextAlign("right")}
            aria-label="Align right"
          >
            <AlignRight className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="justify"
            onClick={() => setTextAlign("justify")}
            aria-label="Justify"
          >
            <AlignJustify className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </ToolbarGroup>

      <Separator orientation="vertical" className="h-6" />

      <ToolbarGroup>
        <Toggle
          size="sm"
          pressed={editor.isActive("heading", { level: 1 })}
          onPressedChange={() => setHeading(1)}
          aria-label="Heading 1"
        >
          <Heading1 className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("heading", { level: 2 })}
          onPressedChange={() => setHeading(2)}
          aria-label="Heading 2"
        >
          <Heading2 className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("heading", { level: 3 })}
          onPressedChange={() => setHeading(3)}
          aria-label="Heading 3"
        >
          <Heading3 className="h-4 w-4" />
        </Toggle>
      </ToolbarGroup>

      <Separator orientation="vertical" className="h-6" />

      <ToolbarGroup>
        <Toggle
          size="sm"
          pressed={editor.isActive("bulletList")}
          onPressedChange={() =>
            editor.chain().focus().toggleBulletList().run()
          }
          aria-label="Bullet list"
        >
          <List className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("orderedList")}
          onPressedChange={() =>
            editor.chain().focus().toggleOrderedList().run()
          }
          aria-label="Ordered list"
        >
          <ListOrdered className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("blockquote")}
          onPressedChange={() =>
            editor.chain().focus().toggleBlockquote().run()
          }
          aria-label="Quote"
        >
          <Quote className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("codeBlock")}
          onPressedChange={() => editor.chain().focus().toggleCodeBlock().run()}
          aria-label="Code block"
        >
          <Code className="h-4 w-4" />
        </Toggle>
      </ToolbarGroup>

      <Separator orientation="vertical" className="h-6" />

      <ToolbarGroup>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="h-8 px-2"
        >
          <Undo className="h-4 w-4" />
          <span className="sr-only">Undo</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="h-8 px-2"
        >
          <Redo className="h-4 w-4" />
          <span className="sr-only">Redo</span>
        </Button>
      </ToolbarGroup>
    </div>
  );
}

function ToolbarGroup({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-0.5", className)}>{children}</div>
  );
}

function getAlignValue(editor: Editor) {
  if (editor.isActive({ textAlign: "left" })) return "left";
  if (editor.isActive({ textAlign: "center" })) return "center";
  if (editor.isActive({ textAlign: "right" })) return "right";
  if (editor.isActive({ textAlign: "justify" })) return "justify";
  return "left";
}
