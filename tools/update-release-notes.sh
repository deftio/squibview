#!/bin/bash

# update-release-notes.sh
# Automated release notes updater for SquibView
# Parses git commits since last tag and updates release_notes.md
#
# Usage: ./tools/update-release-notes.sh <version> [custom-notes]
# Example: ./tools/update-release-notes.sh "1.0.12" "Major CLI improvements"

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Helper functions
log_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

log_success() {
    echo -e "${GREEN}✓${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

log_error() {
    echo -e "${RED}✗${NC} $1"
}

# Function to show usage
show_usage() {
    echo "Usage: $0 <version> [custom-notes]"
    echo ""
    echo "This script updates release_notes.md with a new release entry."
    echo "It parses git commits since the last tag to auto-categorize changes."
    echo ""
    echo "Arguments:"
    echo "  version       Version number (e.g. '1.0.12')"
    echo "  custom-notes  Optional custom release notes"
    echo ""
    echo "Examples:"
    echo "  $0 '1.0.12'"
    echo "  $0 '1.0.12' 'Major CLI improvements with new export features'"
}

# Validate arguments
if [ $# -lt 1 ] || [ $# -gt 2 ]; then
    log_error "Invalid number of arguments"
    show_usage
    exit 1
fi

VERSION="$1"
CUSTOM_NOTES="$2"
RELEASE_NOTES_FILE="docs/release-notes.md"

# Validate version format (basic check)
if [[ ! "$VERSION" =~ ^[0-9]+\.[0-9]+\.[0-9]+(-.*)?$ ]]; then
    log_error "Invalid version format: $VERSION"
    echo "Expected format: X.Y.Z or X.Y.Z-suffix (e.g., 1.0.12 or 1.0.12-dev.0)"
    exit 1
fi

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    log_error "package.json not found. Please run this script from the project root."
    exit 1
fi

if [ ! -f "$RELEASE_NOTES_FILE" ]; then
    log_error "$RELEASE_NOTES_FILE not found."
    exit 1
fi

log_info "Updating release notes for version $VERSION"

# Get the last tag to find commits since then
LAST_TAG=$(git describe --tags --abbrev=0 2>/dev/null || echo "")
if [ -z "$LAST_TAG" ]; then
    log_warning "No previous tags found, analyzing all commits"
    COMMIT_RANGE=""
else
    log_info "Analyzing commits since $LAST_TAG"
    COMMIT_RANGE="$LAST_TAG..HEAD"
fi

# Get current date
CURRENT_DATE=$(date +"%B %d, %Y")

# Parse commits and categorize them
log_info "Parsing git commits for automatic categorization..."

# Initialize arrays for different types of changes
declare -a NEW_FEATURES=()
declare -a IMPROVEMENTS=()
declare -a FIXES=()
declare -a BREAKING=()
declare -a DOCS=()
declare -a BUILD=()

# Parse git log with conventional commit format detection
while IFS= read -r commit; do
    if [ -z "$commit" ]; then continue; fi
    
    # Extract commit message (first line only)
    commit_msg=$(echo "$commit" | head -n1)
    
    # Skip merge commits and automated commits
    if [[ "$commit_msg" =~ ^Merge\ |^Release\ v|Generated\ with\ \[Claude\ Code\] ]]; then
        continue
    fi
    
    # Categorize based on conventional commit format or keywords
    if [[ "$commit_msg" =~ ^feat:|NEW:|^add[[:space:]]|^implement[[:space:]] ]]; then
        NEW_FEATURES+=("$commit_msg")
    elif [[ "$commit_msg" =~ ^fix:|FIXED:|^fix[[:space:]]|^resolve[[:space:]] ]]; then
        FIXES+=("$commit_msg")
    elif [[ "$commit_msg" =~ ^docs:|DOCS:|^update.*doc|^add.*doc ]]; then
        DOCS+=("$commit_msg")
    elif [[ "$commit_msg" =~ ^build:|^chore:|BUILD:|^update.*build ]]; then
        BUILD+=("$commit_msg")
    elif [[ "$commit_msg" =~ BREAKING[[:space:]]CHANGE|!: ]]; then
        BREAKING+=("$commit_msg")
    else
        # Default to improvements for other changes
        IMPROVEMENTS+=("$commit_msg")
    fi
done < <(git log --oneline $COMMIT_RANGE 2>/dev/null || echo "")

# Function to clean and format commit messages
format_commit() {
    local msg="$1"
    # Remove conventional commit prefixes and clean up
    msg=$(echo "$msg" | sed -E 's/^[a-f0-9]+ //')  # Remove hash
    msg=$(echo "$msg" | sed -E 's/^(feat|fix|docs|style|refactor|test|chore|build|perf)(\([^)]+\))?!?:\ ?//')  # Remove conventional prefixes
    msg=$(echo "$msg" | sed -E 's/^(NEW|FIXED|IMPROVED|DOCS|BUILD):\ ?//')  # Remove caps prefixes
    # Capitalize first letter
    msg="$(echo "${msg:0:1}" | tr '[:lower:]' '[:upper:]')${msg:1}"
    echo "- **$msg"
}

# Create the new release entry
log_info "Generating release entry..."

# Create temporary file for the new entry
TEMP_ENTRY=$(mktemp)

cat > "$TEMP_ENTRY" << EOF
## v$VERSION ($CURRENT_DATE)
*Release Date: $CURRENT_DATE*

EOF

# Add custom notes if provided
if [ -n "$CUSTOM_NOTES" ]; then
    echo "### 📝 Release Highlights" >> "$TEMP_ENTRY"
    echo "$CUSTOM_NOTES" >> "$TEMP_ENTRY"
    echo "" >> "$TEMP_ENTRY"
fi

# Add categorized changes
if [ ${#BREAKING[@]} -gt 0 ]; then
    echo "### 💥 Breaking Changes" >> "$TEMP_ENTRY"
    for commit in "${BREAKING[@]}"; do
        format_commit "$commit" >> "$TEMP_ENTRY"
    done
    echo "" >> "$TEMP_ENTRY"
fi

if [ ${#NEW_FEATURES[@]} -gt 0 ]; then
    echo "### 🆕 New Features" >> "$TEMP_ENTRY"
    for commit in "${NEW_FEATURES[@]}"; do
        format_commit "$commit" >> "$TEMP_ENTRY"
    done
    echo "" >> "$TEMP_ENTRY"
fi

if [ ${#IMPROVEMENTS[@]} -gt 0 ]; then
    echo "### ✨ Improvements" >> "$TEMP_ENTRY"
    for commit in "${IMPROVEMENTS[@]}"; do
        format_commit "$commit" >> "$TEMP_ENTRY"
    done
    echo "" >> "$TEMP_ENTRY"
fi

if [ ${#FIXES[@]} -gt 0 ]; then
    echo "### 🐛 Bug Fixes" >> "$TEMP_ENTRY"
    for commit in "${FIXES[@]}"; do
        format_commit "$commit" >> "$TEMP_ENTRY"
    done
    echo "" >> "$TEMP_ENTRY"
fi

if [ ${#DOCS[@]} -gt 0 ]; then
    echo "### 📚 Documentation" >> "$TEMP_ENTRY"
    for commit in "${DOCS[@]}"; do
        format_commit "$commit" >> "$TEMP_ENTRY"
    done
    echo "" >> "$TEMP_ENTRY"
fi

if [ ${#BUILD[@]} -gt 0 ]; then
    echo "### 🔧 Build & Development" >> "$TEMP_ENTRY"
    for commit in "${BUILD[@]}"; do
        format_commit "$commit" >> "$TEMP_ENTRY"
    done
    echo "" >> "$TEMP_ENTRY"
fi

echo "---" >> "$TEMP_ENTRY"
echo "" >> "$TEMP_ENTRY"

# Find the insertion point (after the current dev version)
log_info "Inserting new release entry into $RELEASE_NOTES_FILE..."

# Create backup
cp "$RELEASE_NOTES_FILE" "${RELEASE_NOTES_FILE}.backup"

# Find the line number where to insert (after the current development section)
INSERT_LINE=$(grep -n "^## v.*-dev\|^---$" "$RELEASE_NOTES_FILE" | head -2 | tail -1 | cut -d: -f1)

if [ -z "$INSERT_LINE" ]; then
    # If no dev section found, insert after the first ## line
    INSERT_LINE=$(grep -n "^## " "$RELEASE_NOTES_FILE" | head -2 | tail -1 | cut -d: -f1)
fi

if [ -z "$INSERT_LINE" ]; then
    log_error "Could not find insertion point in $RELEASE_NOTES_FILE"
    rm "$TEMP_ENTRY"
    exit 1
fi

# Insert the new entry
{
    head -n "$INSERT_LINE" "$RELEASE_NOTES_FILE"
    cat "$TEMP_ENTRY"
    tail -n +$((INSERT_LINE + 1)) "$RELEASE_NOTES_FILE"
} > "${RELEASE_NOTES_FILE}.new"

# Replace the original file
mv "${RELEASE_NOTES_FILE}.new" "$RELEASE_NOTES_FILE"

# Clean up
rm "$TEMP_ENTRY"

log_success "Release notes updated successfully!"
log_info "New entry added for version $VERSION"
log_info "Backup saved as ${RELEASE_NOTES_FILE}.backup"

# Show what was added
echo ""
echo "📋 Added entry:"
grep -A 20 "## v$VERSION" "$RELEASE_NOTES_FILE" | head -25

echo ""
log_success "Release notes update complete! 🎉"