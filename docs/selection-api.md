# SquibView Selection API Guide

The Selection API in SquibView allows you to detect, examine, and manipulate text selections in both the source and rendered panels. This guide explains how to use these powerful features in your applications.

## Table of Contents

1. [Introduction](#introduction)
2. [Selection Data Structure](#selection-data-structure)
3. [Detecting Selections](#detecting-selections)
4. [Manipulating Selected Text](#manipulating-selected-text)
5. [Configuring Selection Behavior](#configuring-selection-behavior)
6. [Examples](#examples)
7. [Best Practices](#best-practices)

## Introduction

SquibView's Selection API enables you to:

- Detect when users select text in either panel
- Access information about the selected text
- Replace selected text programmatically
- Control editability of selected text
- Create advanced interactive behaviors

## Selection Data Structure

When text is selected, SquibView creates a selection data object with the following structure:

For the source panel:
```javascript
{
  panel: 'source',
  text: 'selected text',
  range: {
    start: 10,  // Character position
    end: 22     // Character position
  }
}
```

For the rendered panel:
```javascript
{
  panel: 'rendered',
  text: 'selected text',
  range: DOMRange,  // DOM Range object
  element: HTMLElement  // The contenteditable element
}
```

## Detecting Selections

There are two main ways to detect and respond to text selections:

### 1. Using the onTextSelected Callback

```javascript
// Register a callback for selection events
const unsubscribe = editor.onTextSelected(selectionData => {
  console.log(`Selected text: ${selectionData.text}`);
  console.log(`In panel: ${selectionData.panel}`);
  
  // Do something with the selection
  if (selectionData.text.includes('TODO')) {
    handleTodo(selectionData);
  }
});

// Later, to stop listening for selections:
unsubscribe();
```

### 2. Using getCurrentSelection Method

```javascript
// Get current selection at any time
const button = document.getElementById('checkSelection');
button.addEventListener('click', () => {
  const selection = editor.getCurrentSelection();
  
  if (selection) {
    console.log(`Currently selected: ${selection.text}`);
  } else {
    console.log('Nothing currently selected');
  }
});
```

## Manipulating Selected Text

Once you have a selection, you can manipulate it in various ways:

### Replacing Selected Text

```javascript
// Replace selected text with new content
editor.replaceSelectedText('replacement text', selectionData);

// Add formatting based on panel
if (selectionData.panel === 'source') {
  editor.replaceSelectedText(`**${selectionData.text}**`, selectionData); // Bold in Markdown
} else {
  editor.replaceSelectedText(`<strong>${selectionData.text}</strong>`, selectionData); // Bold in HTML
}
```

### Controlling Editability

You can make text in the rendered panel non-editable (locked) or editable (unlocked):

```javascript
// Make selected text non-editable (only works in rendered panel)
if (selectionData.panel === 'rendered') {
  editor.setSelectionEditable(false, selectionData); // Lock (make non-editable)
  
  // Or make it editable
  editor.setSelectionEditable(true, selectionData); // Unlock (make editable)
  
  // Or use the smart toggle that automatically detects current state
  const newState = editor.toggleSelectionLock(selectionData);
  console.log(newState ? "Now editable" : "Now locked");
}
```

Locked content is visually indicated with:
- A lock icon (🔒) at the top-left corner
- A light gray background
- A dashed border
- "Not allowed" cursor when hovering

Unlocked content (after previously being locked) shows an unlock icon (🔓).

### Clearing Selections

```javascript
// Clear current selection
editor.clearSelection();
```

## Configuring Selection Behavior

### Using onReplaceSelectedText Handler

The `onReplaceSelectedText` handler provides a powerful way to automatically process selections and optionally replace them:

```javascript
// Set up a selection handler
editor.onReplaceSelectedText = function(selectionData) {
  // Process selection
  if (selectionData.text === 'TODO') {
    return '✅ DONE'; // Return text to replace the selection
  }
  
  if (selectionData.text.match(/^[a-z]/)) {
    // Capitalize first letter
    return selectionData.text.charAt(0).toUpperCase() + 
           selectionData.text.slice(1);
  }
  
  // Return undefined or null to not replace anything
  // This allows processing selections without modifying them
  logSelectionToAnalytics(selectionData);
};

// Remove the handler
editor.onReplaceSelectedText = null;
```

### Setting Handler in Constructor

You can set up the selection handler when creating the SquibView instance:

```javascript
const editor = new SquibView('#editor', {
  initialContent: '# Hello World',
  inputContentType: 'md',
  onReplaceSelectedText: function(selectionData) {
    // Process selections from the beginning
    if (selectionData.text === 'hello') {
      return 'Hello, world!';
    }
  }
});
```

## Examples

### Basic Text Replacement

```javascript
editor.onTextSelected(selectionData => {
  // Always add exclamation marks to selected text
  const newText = `${selectionData.text}!!!`;
  editor.replaceSelectedText(newText, selectionData);
});
```

### Smart Formatting

```javascript
editor.onReplaceSelectedText = function(selectionData) {
  // Example: Smart formatting based on text content
  if (selectionData.text.match(/^\d+$/)) {
    // Format numbers with commas
    return Number(selectionData.text).toLocaleString();
  }
  
  if (selectionData.text.toLowerCase() === 'date') {
    // Replace "date" with current date
    return new Date().toLocaleDateString();
  }
};
```

### Text Analysis Without Replacement

```javascript
editor.onTextSelected(selectionData => {
  // Analyze text without replacing it
  const wordCount = selectionData.text.split(/\s+/).filter(Boolean).length;
  const charCount = selectionData.text.length;
  
  document.getElementById('stats').innerHTML = `
    <p>Selection contains ${wordCount} words and ${charCount} characters</p>
  `;
});
```

### Creating a Simple Dictionary Tool

```javascript
editor.onReplaceSelectedText = async function(selectionData) {
  // Only process single words
  if (selectionData.text.trim().split(/\s+/).length === 1) {
    const word = selectionData.text.trim();
    
    // Show definition in a tooltip (without replacing)
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      const data = await response.json();
      
      if (data && data[0] && data[0].meanings) {
        const definition = data[0].meanings[0].definitions[0].definition;
        showTooltip(definition, selectionData);
      }
    } catch (err) {
      console.error('Dictionary lookup failed', err);
    }
  }
  
  // Return undefined to not replace the text
};
```

## Best Practices

1. **Consider Context**: Selection behavior may differ between source and rendered panels
   ```javascript
   if (selectionData.panel === 'source') {
     // Handle source panel selection (plain text)
   } else {
     // Handle rendered panel selection (may contain HTML)
   }
   ```

2. **Clean Up Listeners**: Always store and use the unsubscribe function to prevent memory leaks
   ```javascript
   const unsubscribe = editor.onTextSelected(handler);
   // Later:
   unsubscribe();
   ```

3. **Respect User Intent**: Avoid aggressive text replacement that might disrupt the user's workflow
   ```javascript
   // Good: Only replace when there's a clear pattern or intent
   if (selectionData.text.match(/^todo:/i)) {
     return '✅ ' + selectionData.text.substring(5);
   }
   ```

4. **Improve UX With Visual Feedback**: Indicate when selection handling is active
   ```javascript
   editor.onTextSelected(selectionData => {
     // Show UI indicator when text is selected
     document.getElementById('selection-active').style.display = 'block';
     
     // Hide when selection is cleared
     window.setTimeout(() => {
       if (!editor.getCurrentSelection()) {
         document.getElementById('selection-active').style.display = 'none';
       }
     }, 100);
   });
   ```

5. **Combine With Other Events**: Create powerful workflows by combining selection with other events
   ```javascript
   // Track selection
   let lastSelection = null;
   editor.onTextSelected(selectionData => {
     lastSelection = selectionData;
   });
   
   // Use with keyboard shortcuts
   document.addEventListener('keydown', e => {
     if (e.ctrlKey && e.key === 'b' && lastSelection) {
       // Bold on Ctrl+B
       if (lastSelection.panel === 'source') {
         editor.replaceSelectedText(`**${lastSelection.text}**`, lastSelection);
       } else {
         editor.replaceSelectedText(`<strong>${lastSelection.text}</strong>`, lastSelection);
       }
       e.preventDefault();
     }
   });
   ```