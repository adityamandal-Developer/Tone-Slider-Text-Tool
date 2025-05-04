"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { TextEditor } from "../text-editor/TextEditor";
import { useProcessText } from "@/hooks/processText";
import { Undo, Redo, Copy, Check } from "lucide-react";
import { toast } from "sonner";

const TextArea = () => {
  const [value, setValue] = useState("");
  const [editorContent, setEditorContent] = useState("Start writing here...");

  const [history, setHistory] = useState<string[]>([]); //past states
  const [historyIndex, setHistoryIndex] = useState(-1); //Current position in history
  const isHistoryActionRef = useRef(false);

  const [isCopied, setIsCopied] = useState(false);

  const processMutation = useProcessText();

  // Save current state
  useEffect(() => {
    if (
      !isHistoryActionRef.current &&
      editorContent !== "Start writing here..."
    ) {
      if (historyIndex >= 0 && historyIndex < history.length - 1) {
        setHistory(history.slice(0, historyIndex + 1));
      }

      // Add current
      setHistory((prev) => [...prev, editorContent]);
      setHistoryIndex((prev) => prev + 1);
    }

    isHistoryActionRef.current = false;
  }, [editorContent]);

  // Update editor content from API response
  useEffect(() => {
    if (processMutation.isSuccess && processMutation.data?.message) {
      const newContent = processMutation.data.message;
      setEditorContent(newContent);
      setValue(newContent);
      console.log("Content updated from API response");
      toast.success("Text Generated");
    }
  }, [processMutation.isSuccess, processMutation.data]);

  useEffect(() => {
    if (processMutation.isError) {
      console.error("Error processing with API:", processMutation.error);
      toast("Ops! something went wrong, try again");
    }
  }, [processMutation.isError, processMutation.error]);

  const handleUndo = () => {
    if (historyIndex > 0) {
      isHistoryActionRef.current = true;
      setHistoryIndex(historyIndex - 1);
      setEditorContent(history[historyIndex - 1]);
      setValue(history[historyIndex - 1]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      isHistoryActionRef.current = true;
      setHistoryIndex(historyIndex + 1);
      setEditorContent(history[historyIndex + 1]);
      setValue(history[historyIndex + 1]);
    }
  };

  // Copy current text to clipboard
  const handleCopy = async () => {
    try {
      // Always use the latest content from editorContent
      await navigator.clipboard.writeText(editorContent);
      setIsCopied(true);
      toast.success("Text copied");
      // Reset copy status after 1.5 seconds
      setTimeout(() => {
        setIsCopied(false);
      }, 1500);
    } catch (err) {
      toast.error("Error copying");
    }
  };

  // Process the text with the API
  const processWithAPI = () => {
    if (!value.trim()) {
      console.log("No content to process");

      return;
    }

    processMutation.mutate(value);
  };

  return (
    <div className="flex flex-col w-full h-full gap-4 p-2 border rounded-md border-ring mt-2">
      <div className="flex justify-between items-center mb-2">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handleUndo}
            disabled={historyIndex <= 0}
            title="Undo"
          >
            <Undo className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleRedo}
            disabled={historyIndex >= history.length - 1}
            title="Redo"
          >
            <Redo className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleCopy}
            title="Copy text"
          >
            {isCopied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
        <div className="text-xs text-muted-foreground">
          {historyIndex >= 0
            ? `Version ${historyIndex + 1} of ${history.length}`
            : "No changes"}
        </div>
      </div>

      <TextEditor
        setValue={setValue}
        content={editorContent}
        setContent={setEditorContent}
        className="min-h-[500px]"
      />

      <div className="flex justify-end mt-2">
        <Button
          onClick={processWithAPI}
          disabled={processMutation.isPending || !value.trim()}
          className="px-4 py-2"
        >
          {processMutation.isPending ? "Processing..." : "Generate text"}
        </Button>
      </div>
    </div>
  );
};

export default TextArea;
