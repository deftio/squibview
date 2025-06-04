import DiffMatchPatch from 'diff-match-patch';

/**
 * RevisionHistory class handles content revisions with memory-efficient diff storage
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

    // Add new diff and update content type if it changed
    this.diffs.push({
      diff: patchText,
      contentType: contentType !== this.contentType ? contentType : undefined
    });

    // Update the content type if it changed
    if (contentType !== this.contentType) {
      this.contentType = contentType;
    }

    this.currentIndex = this.diffs.length - 1;
  }

  /**
   * Moves backward in the revision history
   *
   * @returns {Object|null} The previous revision state or null if at the beginning
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
   * Moves forward in the revision history
   *
   * @returns {Object|null} The next revision state or null if at the end
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
   * Gets the content at the current revision point
   *
   * @returns {string} The current content
   */
  getCurrentContent() {
    if (this.currentIndex < 0) return this.initialContent;

    // Apply all diffs up to currentIndex
    let content = this.initialContent;
    for (let i = 0; i <= this.currentIndex; i++) {
      const patches = this.diffEngine.patch_fromText(this.diffs[i].diff);
      const [patchedText] = this.diffEngine.patch_apply(patches, content);
      content = patchedText;
    }
    return content;
  }

  /**
   * Gets the content type at the current revision point
   *
   * @returns {string} The current content type
   */
  getCurrentContentType() {
    if (this.currentIndex < 0) return this.contentType;

    // Find the last content type change up to the current index
    let currentType = this.contentType;
    for (let i = 0; i <= this.currentIndex; i++) {
      if (this.diffs[i].contentType !== undefined) {
        currentType = this.diffs[i].contentType;
      }
    }
    return currentType;
  }

  /**
   * Sets the revision to a specific index
   *
   * @param {number} index - The revision index to set
   * @returns {Object|null} The revision state at the index or null if invalid
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
   * Returns the total number of revisions
   *
   * @returns {number} The number of revisions
   */
  getRevisionCount() {
    return this.diffs.length;
  }

  /**
   * Returns the current index in the revision history
   *
   * @returns {number} The current revision index
   */
  getCurrentIndex() {
    return this.currentIndex;
  }
}

export { RevisionManager as RevisionHistory }; 