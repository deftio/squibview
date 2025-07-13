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
    this.initialContentType = ''; // Store the initial content type separately
    this.contentType = ''; // Current content type
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
    this.initialContentType = contentType; // Store initial content type
    this.contentType = contentType; // Current content type
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
    if (this.currentIndex < 0) return this.initialContentType;

    // Find the last content type change up to the current index
    let currentType = this.initialContentType;
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

  /**
   * Gets the content at a specific revision index
   *
   * @param {number} index - Revision index (-1 for initial, 0 to n-1 for revisions)
   * @returns {Object} Object with { content: string, contentType: string }
   */
  getContentAtRevision(index) {
    // Validate index
    if (index < -1 || index >= this.diffs.length) {
      throw new Error(`Invalid revision index: ${index}. Valid range: -1 to ${this.diffs.length - 1}`);
    }

    // Return initial content if index is -1
    if (index === -1) {
      return {
        content: this.initialContent,
        contentType: this.initialContentType
      };
    }

    // Apply diffs up to the specified index to get content
    let content = this.initialContent;
    for (let i = 0; i <= index; i++) {
      const patches = this.diffEngine.patch_fromText(this.diffs[i].diff);
      const [patchedText] = this.diffEngine.patch_apply(patches, content);
      content = patchedText;
    }

    // Find the content type at this revision
    let currentType = this.initialContentType;
    for (let i = 0; i <= index; i++) {
      if (this.diffs[i].contentType !== undefined) {
        currentType = this.diffs[i].contentType;
      }
    }

    return {
      content: content,
      contentType: currentType
    };
  }

  /**
   * Computes diff between two revisions
   *
   * @param {number} fromIndex - Starting revision index (null for current)
   * @param {number} toIndex - Ending revision index (null for current)
   * @returns {Array} DiffMatchPatch diff array
   */
  computeDiff(fromIndex = null, toIndex = null) {
    // Default to comparing previous revision to current if not specified
    if (fromIndex === null) {
      fromIndex = this.currentIndex - 1;
    }
    if (toIndex === null) {
      toIndex = this.currentIndex;
    }

    // Validate indices
    if (fromIndex < -1 || fromIndex >= this.diffs.length) {
      throw new Error(`Invalid fromIndex: ${fromIndex}. Valid range: -1 to ${this.diffs.length - 1}`);
    }
    if (toIndex < -1 || toIndex >= this.diffs.length) {
      throw new Error(`Invalid toIndex: ${toIndex}. Valid range: -1 to ${this.diffs.length - 1}`);
    }
    if (fromIndex > toIndex) {
      throw new Error(`fromIndex (${fromIndex}) cannot be greater than toIndex (${toIndex})`);
    }

    // Get content at both revisions
    const fromContent = this.getContentAtRevision(fromIndex).content;
    const toContent = this.getContentAtRevision(toIndex).content;

    // Compute and return the diff
    const diff = this.diffEngine.diff_main(fromContent, toContent);
    this.diffEngine.diff_cleanupSemantic(diff);
    
    return diff;
  }

  /**
   * Computes line-based diff between revisions
   *
   * @param {number} fromIndex - Starting revision index (null for current - 1)
   * @param {number} toIndex - Ending revision index (null for current)
   * @returns {Array} Array of line diff objects with { type, content, oldLineNum, newLineNum }
   */
  computeLineDiff(fromIndex = null, toIndex = null) {
    // Default to comparing previous revision to current if not specified
    if (fromIndex === null) {
      fromIndex = this.currentIndex - 1;
    }
    if (toIndex === null) {
      toIndex = this.currentIndex;
    }

    // Validate indices
    if (fromIndex < -1 || fromIndex >= this.diffs.length) {
      throw new Error(`Invalid fromIndex: ${fromIndex}. Valid range: -1 to ${this.diffs.length - 1}`);
    }
    if (toIndex < -1 || toIndex >= this.diffs.length) {
      throw new Error(`Invalid toIndex: ${toIndex}. Valid range: -1 to ${this.diffs.length - 1}`);
    }
    if (fromIndex > toIndex) {
      throw new Error(`fromIndex (${fromIndex}) cannot be greater than toIndex (${toIndex})`);
    }

    // Get the full content to properly handle line numbers
    const fromContent = this.getContentAtRevision(fromIndex).content;
    const toContent = this.getContentAtRevision(toIndex).content;
    
    // Split content into lines for reference
    const fromLines = fromContent.split('\n');
    const toLines = toContent.split('\n');
    
    // Use diff_match_patch to compute line-level diffs
    const lineDiff = this.diffEngine.diff_linesToChars_(fromContent, toContent);
    const diffs = this.diffEngine.diff_main(lineDiff.chars1, lineDiff.chars2, false);
    this.diffEngine.diff_charsToLines_(diffs, lineDiff.lineArray);
    
    // Convert to our format
    const lineDiffs = [];
    let oldLineNum = 1;
    let newLineNum = 1;
    
    for (const [operation, text] of diffs) {
      const lines = text.split('\n').filter((line, idx, arr) => 
        // Keep all lines except empty last one (which is just the trailing newline)
        idx < arr.length - 1 || line !== ''
      );
      
      for (const line of lines) {
        if (operation === DiffMatchPatch.DIFF_EQUAL) {
          lineDiffs.push({
            type: 'unchanged',
            content: line,
            oldLineNum: oldLineNum,
            newLineNum: newLineNum
          });
          oldLineNum++;
          newLineNum++;
        } else if (operation === DiffMatchPatch.DIFF_DELETE) {
          lineDiffs.push({
            type: 'removed',
            content: line,
            oldLineNum: oldLineNum,
            newLineNum: null
          });
          oldLineNum++;
        } else if (operation === DiffMatchPatch.DIFF_INSERT) {
          lineDiffs.push({
            type: 'added',
            content: line,
            oldLineNum: null,
            newLineNum: newLineNum
          });
          newLineNum++;
        }
      }
    }
    
    return lineDiffs;
  }

  /**
   * Gets statistics about changes between revisions
   *
   * @param {number} fromIndex - Starting revision index (null for current - 1)
   * @param {number} toIndex - Ending revision index (null for current)
   * @returns {Object} Stats object with { additions, deletions, modifications, totalChanges }
   */
  getDiffStats(fromIndex = null, toIndex = null) {
    // Default to comparing previous revision to current if not specified
    if (fromIndex === null) {
      fromIndex = this.currentIndex - 1;
    }
    if (toIndex === null) {
      toIndex = this.currentIndex;
    }

    // Validate indices (same validation as computeLineDiff)
    if (fromIndex < -1 || fromIndex >= this.diffs.length) {
      throw new Error(`Invalid fromIndex: ${fromIndex}. Valid range: -1 to ${this.diffs.length - 1}`);
    }
    if (toIndex < -1 || toIndex >= this.diffs.length) {
      throw new Error(`Invalid toIndex: ${toIndex}. Valid range: -1 to ${this.diffs.length - 1}`);
    }
    if (fromIndex > toIndex) {
      throw new Error(`fromIndex (${fromIndex}) cannot be greater than toIndex (${toIndex})`);
    }

    // Get the line diff
    const lineDiff = this.computeLineDiff(fromIndex, toIndex);
    
    // Calculate statistics
    const stats = {
      additions: 0,
      deletions: 0,
      modifications: 0,
      totalChanges: 0
    };
    
    // Count different types of changes
    for (let i = 0; i < lineDiff.length; i++) {
      const line = lineDiff[i];
      
      if (line.type === 'added') {
        stats.additions++;
        stats.totalChanges++;
      } else if (line.type === 'removed') {
        stats.deletions++;
        stats.totalChanges++;
        
        // Check if this is part of a modification (removed line followed by added line)
        // This is a simplified heuristic - a more sophisticated approach would use
        // line similarity analysis
        if (i + 1 < lineDiff.length && lineDiff[i + 1].type === 'added') {
          stats.modifications++;
          // Don't double count the deletion and addition as separate changes
          stats.totalChanges--;
        }
      }
    }
    
    return stats;
  }

  /**
   * Gets metadata about a revision
   *
   * @param {number} index - Revision index (-1 for initial, 0+ for revisions)
   * @returns {Object} Revision metadata including index, contentType, size, and other info
   */
  getRevisionInfo(index) {
    // Validate index
    if (index < -1 || index >= this.diffs.length) {
      throw new Error(`Invalid revision index: ${index}. Valid range: -1 to ${this.diffs.length - 1}`);
    }

    // Get the content at this revision
    const { content, contentType } = this.getContentAtRevision(index);
    
    // Build revision info object
    const info = {
      index: index,
      contentType: contentType,
      contentSize: content.length,
      lineCount: content.split('\n').length,
      isCurrent: index === this.currentIndex
    };

    // Add diff-specific info for non-initial revisions
    if (index >= 0) {
      info.diffSize = this.diffs[index].diff.length;
      info.hasContentTypeChange = this.diffs[index].contentType !== undefined;
      
      // Add stats comparing to previous revision
      const stats = this.getDiffStats(index - 1, index);
      info.changeStats = stats;
    } else {
      // Initial revision has no diff
      info.diffSize = 0;
      info.hasContentTypeChange = false;
      info.changeStats = {
        additions: 0,
        deletions: 0,
        modifications: 0,
        totalChanges: 0
      };
    }

    return info;
  }
}

export { RevisionManager as RevisionHistory }; 