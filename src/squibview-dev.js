/**
 * squibview-dev.js - Development version wrapper
 * 
 * This file wraps the original squibview.js and handles
 * the import-map-based dependencies for local development.
 */

// Import the shims for development mode
import * as shim from './import-shim.js';

// Now we can safely use these in our code
const TinyEmitter = shim.TinyEmitter;
const DiffMatchPatch = shim.DiffMatchPatch;

/**
 * RevisionManager class handles content revisions with memory-efficient diff storage
 */
class RevisionManager {
  /**
   * Creates a new RevisionManager instance
   */
  constructor() {
    this.initialContent = '';
    this.contentType = '';
    this.diffs = [];
    this.currentIndex = -1;
    this.diffEngine = new DiffMatchPatch();
  }
  
  /**
   * Initializes the revision manager with initial content
   * 
   * @param {string} content - The initial content
   * @param {string} contentType - The content type
   */
  initialize(content, contentType) {
    this.initialContent = content;
    this.contentType = contentType;
    this.diffs = [];
    this.currentIndex = -1;
  }
  
  /**
   * Adds a new revision
   * 
   * @param {string} newContent - The new content to add as a revision
   * @param {string} contentType - The content type of the revision
   */
  addRevision(newContent, contentType) {
    // Calculate diff between current state and new state
    const currentContent = this.getCurrentContent();
    const diff = this.diffEngine.diff_main(currentContent, newContent);
    this.diffEngine.diff_cleanupSemantic(diff);
    const patchText = this.diffEngine.patch_toText(
      this.diffEngine.patch_make(currentContent, diff)
    );
    
    // Remove any forward history if we're branching
    if (this.currentIndex < this.diffs.length - 1) {
      this.diffs = this.diffs.slice(0, this.currentIndex + 1);
    }
    
    // Add the new diff
    this.diffs.push({
      patch: patchText,
      contentType
    });
    
    this.currentIndex = this.diffs.length - 1;
  }
  
  /**
   * Gets the current revision content
   * 
   * @returns {string} The current content
   */
  getCurrentContent() {
    if (this.currentIndex < 0) {
      return this.initialContent;
    }
    
    // Start with initial content and apply all diffs up to current index
    let content = this.initialContent;
    for (let i = 0; i <= this.currentIndex; i++) {
      const patches = this.diffEngine.patch_fromText(this.diffs[i].patch);
      const [patchedText] = this.diffEngine.patch_apply(patches, content);
      content = patchedText;
    }
    
    return content;
  }
  
  /**
   * Gets the current revision content type
   * 
   * @returns {string} The current content type
   */
  getCurrentContentType() {
    if (this.currentIndex < 0) {
      return this.contentType;
    }
    
    return this.diffs[this.currentIndex].contentType;
  }
  
  /**
   * Moves to the previous revision if available
   * 
   * @returns {Object|null} The previous state or null if at the beginning
   */
  undo() {
    if (this.currentIndex >= 0) {
      this.currentIndex--;
      
      return {
        content: this.getCurrentContent(),
        contentType: this.getCurrentContentType()
      };
    }
    
    return null;
  }
  
  /**
   * Moves to the next revision if available
   * 
   * @returns {Object|null} The next state or null if at the end
   */
  redo() {
    if (this.currentIndex < this.diffs.length - 1) {
      this.currentIndex++;
      
      return {
        content: this.getCurrentContent(),
        contentType: this.getCurrentContentType()
      };
    }
    
    return null;
  }
  
  /**
   * Sets the revision to a specific index
   * 
   * @param {number} index - The revision index to set
   * @returns {Object|null} The state at the index or null if invalid
   */
  setRevision(index) {
    if (index >= -1 && index < this.diffs.length) {
      this.currentIndex = index;
      
      return {
        content: this.getCurrentContent(),
        contentType: this.getCurrentContentType()
      };
    }
    
    return null;
  }
  
  /**
   * Gets the total number of revisions
   * 
   * @returns {number} The number of revisions
   */
  getRevisionCount() {
    return this.diffs.length;
  }
  
  /**
   * Gets the current revision index
   * 
   * @returns {number} The current revision index
   */
  getCurrentIndex() {
    return this.currentIndex;
  }
}

/**
 * SquibView class for markdown and HTML editing with live preview
 */
class SquibView {
  /**
   * Creates a new SquibView instance
   * 
   * @param {string|HTMLElement} element - The selector or element to initialize SquibView in
   * @param {Object} options - Configuration options
   */
  constructor(element, options = {}) {
    // Set up the options with defaults
    this.options = {
      baseClass: 'squibview',
      titleShow: true,
      titleContent: 'SquibView',
      showControls: true,
      show_md_buttons: false,
      initialContent: '',
      inputContentType: 'md',
      initialView: 'split',
      onReplaceSelectedText: null,
      ...options
    };
    
    // Initialize the event emitter
    this.events = new TinyEmitter();
    
    // Initialize the revision manager
    this.revisionManager = new RevisionManager();
    
    // Set up the container
    if (typeof element === 'string') {
      this.container = document.querySelector(element);
    } else {
      this.container = element;
    }
    
    if (!this.container) {
      throw new Error(`Element ${element} not found`);
    }
    
    // Create the basic structure
    this.createStructure();
    
    // Set up event handlers
    this.initializeEventHandlers();
    
    // Initialize input content
    this.inputContentType = this.options.inputContentType;
    this.input.value = this.options.initialContent;
    
    // Save initial revision if content provided
    if (this.options.initialContent) {
      this.revisionManager.initialize(this.options.initialContent, this.inputContentType);
    }
    
    // Set view mode
    this.setView(this.options.initialView);
    
    // Initialize selection state
    this._selectionCache = {
      source: null,
      rendered: null
    };
    
    // Render output
    this.renderOutput();
  }

  // Include the rest of the SquibView class here
  // ...

  /**
   * Version information
   */
  static get version() {
    return {
      version: '0.0.30-dev',
      build: 'development',
      date: new Date().toISOString()
    };
  }
}

// Export the SquibView class and RevisionManager
export default SquibView;
export { RevisionManager };