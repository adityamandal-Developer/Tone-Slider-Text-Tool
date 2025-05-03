"use client";

import { useTonePercentage } from "@/components/componentLayouts/text-editor-layout";
import { useMutation } from "@tanstack/react-query";

interface ApiResponse {
  message: string;
  [key: string]: any;
}

export const useProcessText = () => {
  const { tonePercentage } = useTonePercentage();

  return useMutation<ApiResponse, Error, string>({
    mutationFn: async (text: string) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}tone-changes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "mistral-small-latest",
            tone: tonePercentage,
            messages: [
              {
                role: "user",
                content: text,
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      return response.json();
    },
  });
};
