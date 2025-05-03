"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import { Dispatch, SetStateAction, useEffect } from "react";
import Toolbar from "./ToolBar";
import { cn } from "@/lib/utils";

const AUTOSAVE_KEY = "text-editor-content";

interface TextEditorProps {
  className?: string;
  setValue: Dispatch<SetStateAction<string>>;
  content?: string;
  setContent?: Dispatch<SetStateAction<string>>;
}

export function TextEditor({
  className,
  setValue,
  content = "Start writing here...",
  setContent,
}: TextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right", "justify"],
      }),
      Underline,
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
      Placeholder.configure({
        placeholder: "Start writing...",
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg dark:prose-invert focus:outline-none max-w-none leading-normal",
      },
    },
    content: content,
    autofocus: true,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const text = editor.getText();
      setValue(text);

      const html = editor.getHTML();
      console.log("Editor HTML:", html);
    },
  });

  useEffect(() => {
    if (editor && content) {
      // Only update if the content is different from current editor content
      // to avoid cursor position issues
      if (editor.getText() !== content) {
        editor.commands.setContent(content);
      }
    }
  }, [editor, content]);

  // Load saved content from localStorage on initial load
  useEffect(() => {
    if (editor && typeof window !== "undefined" && !content) {
      const savedContent = localStorage.getItem(AUTOSAVE_KEY);
      if (savedContent) {
        try {
          editor.commands.setContent(JSON.parse(savedContent));
        } catch (e) {
          console.error("Error parsing saved content:", e);
        }
      }
    }
  }, [editor, content]);

  // Save content to localStorage when it changes
  useEffect(() => {
    if (editor) {
      const saveContent = () => {
        const content = editor.getJSON();
        localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(content));

        if (setContent) {
          setContent(editor.getText());
        }
      };

      // Debounced save on content change
      const timeoutId = setTimeout(saveContent, 500);

      editor.on("update", saveContent);

      return () => {
        clearTimeout(timeoutId);
        editor.off("update", saveContent);
      };
    }
  }, [editor, setContent]);

  return (
    <div className={cn("flex flex-col rounded-md border shadow-sm", className)}>
      {editor && <Toolbar editor={editor} />}
      <EditorContent
        editor={editor}
        className="min-h-[300px] p-4 overflow-y-auto"
      />
    </div>
  );
}
