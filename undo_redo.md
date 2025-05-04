# Undo/Redo Functionality and State Management in `TextArea` Component

This document explains how the undo/redo functionality is implemented in the `TextArea` React component and how the component's state is managed to support this feature.

## State Variables

The component utilizes several state variables to manage the text content and history:

- `value`: A string that holds the current value of the text being input by the user in the `TextEditor`.
- `editorContent`: A string that represents the content displayed in the `TextEditor`. default with "Start writing here". This state is updated directly by the `TextEditor` and also when undo/redo actions occur or when the API response is received.
- `history`: An array of strings that stores the past states of the `editorContent`. This array allows to go back and forth the changes.
- `historyIndex`: A number that keeps track of the current position within the `history` array. `-1` indicates the initial state or no changes yet.
- `isHistoryActionRef`: A `useRef` that acts as a flag to prevent saving a new state to history when an undo or redo action is being performed. This avoids creating extra history entries during these operations.
- `isCopied`: A boolean state to indicate whether the text has been successfully copied to the clipboard. This is used to update the copy buttons icon.

## Saving State to History (`useEffect` Hook)

The first `useEffect` hook is responsible for saving the current `editorContent` to the `history` array whenever it changes.

```javascript
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
```

- It checks if the change in `editorContent` was not triggered by an undo or redo action (`!isHistoryActionRef.current`) and that the content is not the initial placeholder text.
- If the `historyIndex` is not at the end of the history array, it means i have undone some actions
- The current `editorContent` is then added to the history array, and the `historyIndex` is incremented to point to the newly added state.
- `isHistoryActionRef.current` is reset to `false` to allow saving the next content change.

## Updating Content from API (`useEffect` Hook)

This `useEffect` hook handles updating the `editorContent` and `value` when the `processMutation` (from the `useProcessText` hook) is successful.

```javascript
useEffect(() => {
  if (processMutation.isSuccess && processMutation.data?.message) {
    const newContent = processMutation.data.message;
    setEditorContent(newContent);
    setValue(newContent);
    console.log("Content updated from API response");
    toast.success("Text Generated");
  }
}, [processMutation.isSuccess, processMutation.data]);
```

When the API call is successful and returns a message, this hook updates both `editorContent` (to display the new text in the editor) and `value` (to keep the input value in sync). A success toast notification is also shown.

## Handling API Errors (`useEffect` Hook)

This `useEffect` hook listens for errors from the `processMutation`.

```javascript
useEffect(() => {
  if (processMutation.isError) {
    console.error("Error processing with API:", processMutation.error);
    toast("Ops! something went wrong, try again");
  }
}, [processMutation.isError, processMutation.error]);
```

If an error occurs during the API call, an error message is logged to the console, and an error toast notification is displayed to the user.

## Undo Functionality (`handleUndo` Function)

The `handleUndo` function is called when the undo button is clicked.

```javascript
const handleUndo = () => {
  if (historyIndex > 0) {
    isHistoryActionRef.current = true;
    setHistoryIndex(historyIndex - 1);
    setEditorContent(history[historyIndex - 1]);
    setValue(history[historyIndex - 1]);
  }
};
```

- It checks if there are previous states in the history (`historyIndex > 0`).
- It sets `isHistoryActionRef.current` to `true` to prevent the `useEffect` hook from saving this state change as a new entry in the history.
- It decrements the `historyIndex` to move to the previous state.
- It updates both `editorContent` and `value` with the content of the previous state from the history array.

## Redo Functionality (`handleRedo` Function)

The `handleRedo` function is called when the redo button is clicked.

```javascript
const handleRedo = () => {
  if (historyIndex < history.length - 1) {
    isHistoryActionRef.current = true;
    setHistoryIndex(historyIndex + 1);
    setEditorContent(history[historyIndex + 1]);
    setValue(history[historyIndex + 1]);
  }
};
```

- It checks if there are any future states in the history (`historyIndex < history.length - 1`).
- It sets `isHistoryActionRef.current` to `true` to prevent saving this state change.
- It increments the `historyIndex` to move to the next state.
- It updates both `editorContent` and `value` with the content of the next state from the history array.

## Copy Functionality (`handleCopy` Function)

The `handleCopy` function handles copying the current text to the clipboard.

```javascript
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
```

- It uses the `navigator.clipboard.writeText()` API to copy the current `editorContent` to the clipboard.
- It sets `isCopied` to `true` to update the copy button's icon to a checkmark.
- A success toast is shown.
- After 1.5 seconds, `isCopied` is set back to `false` to revert the button icon.
- If an error occurs during the copy process, an error toast is displayed.

## Processing with API (`processWithAPI` Function)

This function is called when the "Generate text" button is clicked.

```javascript
const processWithAPI = () => {
  if (!value.trim()) {
    console.log("No content to process");
    return;
  }

  processMutation.mutate(value);
};
```

- It checks if the `value` (current input text) is not empty after trimming whitespace.
- If there is content, it calls the `mutate` function from the `useProcessText` hook, passing the current value to the API for processing.

Thank you
