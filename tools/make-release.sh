#!/bin/bash

# make-release.sh
# Automated release script for SquibView
# Creates git tag and GitHub release (npm publish must be done manually)
#
# Usage: ./tools/make-release.sh <version> [release-notes]
# Example: ./tools/make-release.sh 1.0.5 "Bug fixes and performance improvements"
# Example: ./tools/make-release.sh 1.1.0  # Will auto-generate notes

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
    echo "Usage: $0 [release-notes]"
    echo ""
    echo "This script creates a git tag and GitHub release using the current package.json version."
    echo "Update package.json version BEFORE running this script, then run 'npm run prerelease'."
    echo ""
    echo "Arguments:"
    echo "  release-notes  Optional custom release notes (otherwise auto-generated)"
    echo ""
    echo "Examples:"
    echo "  $0"
    echo "  $0 \"Major update with new CLI features\""
    echo ""
    echo "Recommended workflow:"
    echo "  1. Update package.json version manually"
    echo "  2. npm run prerelease  # Build and test with new version"
    echo "  3. $0 \"release notes\" # Create git tag and GitHub release"
    echo "  4. npm publish         # Publish to npm"
    echo ""
    echo "Note: You must run 'npm publish' manually after this script completes."
}

# Validate arguments
if [ $# -gt 1 ]; then
    log_error "Invalid number of arguments"
    show_usage
    exit 1
fi

CUSTOM_NOTES="$1"

# Get current version from package.json
VERSION=$(node -p "require('./package.json').version")
TAG_NAME="v$VERSION"

log_info "Starting release process for version $VERSION"
log_warning "Make sure you've run 'npm run prerelease' first to build and test everything!"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    log_error "package.json not found. Please run this script from the project root."
    exit 1
fi

# Check if git repo
if [ ! -d ".git" ]; then
    log_error "Not a git repository. Please run this script from a git repository."
    exit 1
fi

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    log_error "GitHub CLI (gh) is not installed. Please install it first:"
    echo "  brew install gh  # macOS"
    echo "  # or visit: https://cli.github.com"
    exit 1
fi

# Check if gh is authenticated
if ! gh auth status &> /dev/null; then
    log_error "GitHub CLI is not authenticated. Please run:"
    echo "  gh auth login"
    exit 1
fi

# Check for uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    log_warning "You have uncommitted changes:"
    git status --short
    echo ""
    read -p "Continue anyway? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        log_info "Aborting release"
        exit 1
    fi
fi

# Check if tag already exists
if git tag -l | grep -q "^$TAG_NAME$"; then
    log_error "Tag $TAG_NAME already exists"
    exit 1
fi

# Check if we're on main branch
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
    log_warning "You are on branch '$CURRENT_BRANCH', not 'main'"
    read -p "Continue anyway? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        log_info "Aborting release"
        exit 1
    fi
fi

log_info "Pre-flight checks passed"

log_info "Using version $VERSION from package.json"

# Verify that version.js is in sync (should be done by prerelease)
if [ -f "src/version.js" ]; then
    VERSION_JS_VERSION=$(node -p "require('./src/version.js').VERSION" 2>/dev/null || echo "unknown")
    if [ "$VERSION_JS_VERSION" != "$VERSION" ]; then
        log_warning "src/version.js ($VERSION_JS_VERSION) doesn't match package.json ($VERSION)"
        log_warning "Run 'npm run prerelease' to rebuild with correct version"
    else
        log_success "src/version.js matches package.json ($VERSION)"
    fi
fi

log_success "Ready to release version $VERSION"

# Update release notes
log_info "Updating release notes..."
if [ -n "$CUSTOM_NOTES" ]; then
    ./tools/update-release-notes.sh "$VERSION" "$CUSTOM_NOTES"
else
    ./tools/update-release-notes.sh "$VERSION"
fi
log_success "Release notes updated"

# Commit release files
log_info "Checking for changes to commit..."
git add package.json package-lock.json src/version.js dist/ cli/ docs/release-notes.md

if git diff --cached --quiet; then
    log_info "No changes to commit - files already committed"
else
    log_info "Committing release files..."
    git commit -m "Release v$VERSION

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"
    log_success "Changes committed"
fi

# Create and push tag
log_info "Creating git tag $TAG_NAME..."
git tag -a "$TAG_NAME" -m "Version $VERSION"

log_info "Pushing changes and tag to origin..."
git push origin "$CURRENT_BRANCH"
git push origin "$TAG_NAME"

log_success "Tag $TAG_NAME created and pushed"

# Create GitHub release
log_info "Creating GitHub release..."

if [ -n "$CUSTOM_NOTES" ]; then
    # Use custom release notes
    gh release create "$TAG_NAME" \
        --title "Version $VERSION" \
        --notes "$CUSTOM_NOTES" \
        --latest
else
    # Auto-generate release notes
    gh release create "$TAG_NAME" \
        --title "Version $VERSION" \
        --generate-notes \
        --latest
fi

log_success "GitHub release created: https://github.com/$(gh repo view --json nameWithOwner -q .nameWithOwner)/releases/tag/$TAG_NAME"

# Final instructions
echo ""
echo "🎉 Release $TAG_NAME created successfully!"
echo ""
echo "📦 Next steps:"
echo "   1. Review the GitHub release page"
echo "   2. Test the package locally: npm pack"
echo "   3. Publish to npm: npm publish"
echo ""
echo "💡 Complete release workflow:"
echo "   1. Edit package.json version manually"
echo "   2. npm run prerelease     # Build + test with new version"
echo "   3. ./tools/make-release.sh \"release notes\"  # Create git tag and GitHub release"
echo "   4. npm publish            # Publish to npm"
echo ""
echo "💡 Development workflow:"
echo "   npm test               # Fast unit tests"
echo "   npm run build:fast     # Quick ESM build"
echo "   npm run test:cli       # Fast CLI test"
echo ""
echo "💡 Manual npm publish commands:"
echo "   npm publish --dry-run  # Review what will be published"
echo "   npm publish            # Actually publish"
echo ""

# Show dry-run info
log_info "Running npm publish --dry-run for review..."
npm publish --dry-run

echo ""
log_success "Release process completed! 🚀"