"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { TextEditor } from "../text-editor/TextEditor";
import { useProcessText } from "@/hooks/processText";

const TextArea = () => {
  const [value, setValue] = useState("");
  const [editorContent, setEditorContent] = useState("Start writing here...");

  const processMutation = useProcessText();

  // Update editor content
  useEffect(() => {
    if (processMutation.isSuccess && processMutation.data?.message) {
      setEditorContent(processMutation.data.message);
      console.log("Content updated from API response");
    }
  }, [processMutation.isSuccess, processMutation.data]);

  //API error
  useEffect(() => {
    if (processMutation.isError) {
      console.error("Error processing with API:", processMutation.error);
      //toast notifications
    }
  }, [processMutation.isError, processMutation.error]);

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
          {processMutation.isPending ? "Processing..." : "Process with API"}
        </Button>
      </div>
    </div>
  );
};

export default TextArea;
