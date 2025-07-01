# Generic Task Management CLI Tool Specification

## Overview

A command-line tool designed for LLM-assisted development workflows. Manages project tasks stored in markdown files (`tasks.md` and `tasks_completed.md`) with structured formatting, automatic IDs, and seamless git integration. Optimized for human-AI collaboration in software development projects.

## Why This Tool for LLM Workflows?

### 🤖 **LLM-Native Format**
- **Markdown**: LLMs read/write markdown naturally or via cli tool
- **Structured Text**: Clear hierarchy and formatting 
- **Context-Rich**: Tasks include full context for AI understanding
- **Parseable**: Easy for both humans and AI to process

### 🔄 **Human-AI Collaboration**
- **Shared Understanding**: Both human and AI can manage tasks
- **Context Preservation**: Full implementation details captured
- **Version Tracking**: Correlate tasks with code changes
- **History Awareness**: AI can reference completed work

### 📁 **Git-Centric Development**
- **Version Control**: Tasks tracked alongside code
- **Merge Friendly**: Plain text resolves conflicts easily
- **Branch Awareness**: Tasks can be branch-specific
- **Commit Integration**: Direct correlation between tasks and changes

## File Structure

The tool operates on two markdown files (configurable location):
- `tasks.md` - Active tasks organized by priority and category
- `tasks_completed.md` - Completed tasks with completion metadata (version, commit, implementation details)
-  `task-rules.md` - a document which governs rules about how tasks are managed and is emitted in the same level as tasks.md and tasks_completed.md.


## Command Interface

### Installation & Setup
```bash
# Make executable
chmod +x tools/task-manager.js

# Add to npm scripts (optional)
npm run task -- <command>

# Or run directly
node tools/task-manager.js <command>
```

### Core Commands

#### 1. Add Task
```bash
task add "Task title" --priority high|medium|low --category "Category Name"
task add "Fix CLI errors" --priority high --category "Critical CLI Issues"
task add "Add PDF export" --priority medium --category "Enhanced Features"
```

**Behavior:**
- Generates unique task ID
- Adds to appropriate priority section in tasks.md
- Creates checkbox format: `- ⬜ **Task title** - Description`
- Maintains existing category structure

#### 2. List Tasks
```bash
task list                           # All tasks
task list --priority high          # Filter by priority
task list --category "CLI"         # Filter by category (partial match)
task list --completed              # Show completed tasks
task list --format json            # JSON output for scripting
```

**Output Format:**
```
[HIGH] CLI-001: Fix squibv CLI runtime errors (Critical CLI Issues)
[MED]  UX-002: Improve README.md content (Content & User Experience)
[LOW]  PERF-003: Optimize bundle sizes (Performance & Optimization)
```

#### 3. Complete Task
```bash
task complete CLI-001 --version "1.0.8" --commit "abc1234" --description "Resolved TypeError on external machines"
task complete UX-002 --description "Implemented above-the-fold strategy"
task complete FEAT-003 --version "1.2.0" --commit "def5678" --implementation "Added new PDF export using puppeteer, updated CLI with --format option"
```

**Behavior:**
- Moves task from tasks.md to tasks_completed.md
- Adds completion metadata (date, version, commit hash, implementation details)
- Auto-detects current git commit if not specified
- Auto-detects version from package.json if not specified
- Maintains task history for project tracking

#### 4. Update Task
```bash
task update CLI-001 --priority medium     # Change priority
task update CLI-001 --category "Core"     # Move to different category
task update CLI-001 --title "New title"   # Update title
```

#### 5. Delete Task
```bash
task delete CLI-001                        # Remove task entirely
task delete CLI-001 --confirm             # Skip confirmation prompt
```

#### 6. Search Tasks
```bash
task search "PDF"                          # Search titles and descriptions
task search "CLI" --completed             # Search completed tasks only
```

#### 7. Statistics
```bash
task stats                                 # Task counts by priority/category
task stats --detailed                     # Include completion rates
```

## Task ID System

### Format: `{CATEGORY}-{NUMBER}`
- `CLI-001`, `CLI-002` - CLI-related tasks
- `UX-001`, `UX-002` - User experience tasks  
- `CORE-001`, `CORE-002` - Core architecture tasks
- `PERF-001`, `PERF-002` - Performance tasks

### Category Mapping (Configurable)
```javascript
// Default mapping - can be customized per project
const categoryPrefixes = {
  "Critical Issues": "CRIT",
  "Bug Fixes": "BUG",
  "Features": "FEAT", 
  "Performance": "PERF",
  "Documentation": "DOC",
  "Testing": "TEST",
  "DevOps": "DEVOPS",
  "Refactoring": "REFACTOR"
};
```

## File Format Preservation

### tasks.md Structure
```markdown
# Project Tasks

## High Priority Tasks

### Critical Issues
- ⬜ **[CRIT-001] Fix memory leak in main process** - Memory usage grows unbounded during long sessions (GitHub Issue #42)
- ⬜ **[CRIT-002] Security vulnerability in auth** - CVE-2024-12345 requires immediate patch

### Features  
- ⬜ **[FEAT-001] Add dark mode support** - User-requested theme switching capability
```

### tasks_completed.md Structure
```markdown
### Critical Fixes - v1.2.3 (2024-12-15) - commit:abc1234
- ✅ **[CRIT-001] Fix memory leak in main process** - Implemented proper cleanup in event handlers, added memory monitoring
- ✅ **[BUG-002] Button spacing issue on mobile** - Updated CSS grid layout with proper responsive breakpoints

### Feature Development - v1.3.0 (2024-12-20) - commit:def5678  
- ✅ **[FEAT-001] Add dark mode support** - Implemented CSS custom properties, toggle component, persistent user preference storage via localStorage
```

## Implementation Details

### Technology Stack
- **Language**: Node.js (ES modules)
- **CLI Framework**: Commander.js for argument parsing
- **File Processing**: fs/promises for async file operations
- **Markdown Parsing**: Custom parser (maintain exact formatting)

### Key Features

#### 1. Smart ID Generation
- Scans existing tasks to find next available ID
- Handles gaps in numbering sequence
- Prevents duplicate IDs

#### 2. Category Auto-Detection
- Fuzzy matching for category names
- Suggests categories based on keywords
- Creates new categories when needed

#### 3. Format Preservation
- Maintains existing markdown structure
- Preserves comments, spacing, and formatting
- Only modifies task lines, keeps everything else intact

#### 4. Validation
- Ensures required fields are present
- Validates priority levels
- Checks for duplicate task titles

#### 5. Backup & Recovery
- Creates backup files before modifications
- Rollback capability for failed operations
- Git integration for change tracking

### Error Handling

#### File Access Errors
- Check file permissions and existence
- Create missing files with default structure
- Handle concurrent access gracefully

#### Data Validation Errors
- Clear error messages for invalid input
- Suggestions for correct format
- Partial operation recovery

#### Git Integration Errors
- Continue operation if git is unavailable
- Optional auto-commit for task changes
- Branch awareness for task context

## Configuration

### .taskrc.json (optional)
```json
{
  "tasksFile": "tasks.md",
  "completedFile": "tasks_completed.md", 
  "backupDir": ".task-backups",
  "autoCommit": false,
  "autoDetectVersion": true,
  "autoDetectCommit": true,
  "defaultPriority": "medium",
  "versionFile": "package.json",
  "categoryPrefixes": {
    "Critical Issues": "CRIT",
    "Bug Fixes": "BUG",
    "Features": "FEAT"
  },
  "completionTemplate": "{{description}}{{#implementation}} - {{implementation}}{{/implementation}}"
}
```

## Usage Examples

### Daily Workflow
```bash
# Morning standup - see what's active
task list --priority high

# Add new bug report from user feedback
task add "Fix form validation edge case" --priority high --category "Bug Fixes"

# Complete yesterday's work with full context
task complete FEAT-005 --version "2.1.0" --commit "a1b2c3d" --implementation "Added OAuth integration using passport.js, configured for Google and GitHub providers"

# Check progress for team standup
task stats
```

### Release Planning
```bash
# See all high priority items for sprint planning
task list --priority high --format json > sprint-tasks.json

# Adjust priorities based on customer feedback
task update CRIT-001 --priority high
task update FEAT-002 --priority medium

# Generate release notes from completed work
task list --completed --category "Features" > release-features.md
```

### LLM Collaboration Workflow
```bash
# AI can search context for similar implementations
task search "authentication" --completed

# Find all open API-related work
task list --category "API"

# Add task with rich context for AI assistance
task add "Implement rate limiting middleware" --priority medium --category "Features" --description "Add configurable rate limiting (100 req/min default) with Redis backend for distributed apps"
```

## Benefits

### 1. Consistency
- Standardized task format across the project
- Automatic ID assignment prevents conflicts
- Consistent completion metadata

### 2. Efficiency  
- No manual markdown editing required
- Quick filtering and searching
- Automated task migration between files

### 3. Integration
- Works with existing markdown files
- Git-friendly plain text format
- Scriptable for automation

### 4. Tracking
- Historical task completion data
- Progress metrics and statistics
- Version correlation for releases

### 5. Collaboration
- Clear task ownership and status
- Merge-friendly task additions
- Searchable task history

## Future Enhancements

### Phase 2 Features
- Task dependencies and blocking relationships
- Time estimation and tracking
- Integration with GitHub issues
- Task templates for common patterns
- Slack/Discord notifications for task updates

### Phase 3 Features
- Web UI for task management
- Task assignment and team collaboration
- Automated task creation from code comments
- Integration with CI/CD for task validation
- Advanced reporting and analytics