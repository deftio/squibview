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
    echo "Usage: $0 <version> [release-notes]"
    echo ""
    echo "Arguments:"
    echo "  version        Version number or increment type"
    echo "                 • Explicit: 1.0.5, v1.0.5"
    echo "                 • Auto-increment: patch, minor, major"
    echo "  release-notes  Optional custom release notes (otherwise auto-generated)"
    echo ""
    echo "Examples:"
    echo "  $0 v1.0.5"
    echo "  $0 1.1.0 \"Major update with new CLI features\""
    echo "  $0 patch \"Bug fixes and improvements\""
    echo "  $0 minor \"New CLI features added\""
    echo "  $0 major \"Breaking API changes\""
    echo ""
    echo "Note: You must run 'npm publish' manually after this script completes."
}

# Validate arguments
if [ $# -lt 1 ] || [ $# -gt 2 ]; then
    log_error "Invalid number of arguments"
    show_usage
    exit 1
fi

VERSION_INPUT="$1"
CUSTOM_NOTES="$2"

# Get current version from package.json
CURRENT_VERSION=$(node -p "require('./package.json').version")

# Handle different version input types
case "$VERSION_INPUT" in
    "patch"|"minor"|"major")
        log_info "Auto-incrementing $VERSION_INPUT version from $CURRENT_VERSION"
        VERSION=$(npm version "$VERSION_INPUT" --no-git-tag-version)
        VERSION=${VERSION#v}  # Remove 'v' prefix if npm adds it
        ;;
    v*)
        # Remove 'v' prefix for processing
        VERSION=${VERSION_INPUT#v}
        # Validate version format
        if ! [[ "$VERSION" =~ ^[0-9]+\.[0-9]+\.[0-9]+(-[a-zA-Z0-9]+)?$ ]]; then
            log_error "Invalid version format. Expected format: vX.Y.Z or vX.Y.Z-suffix"
            exit 1
        fi
        ;;
    *)
        # Assume it's a version number without 'v' prefix
        VERSION="$VERSION_INPUT"
        # Validate version format
        if ! [[ "$VERSION" =~ ^[0-9]+\.[0-9]+\.[0-9]+(-[a-zA-Z0-9]+)?$ ]]; then
            log_error "Invalid version format. Expected format: X.Y.Z, vX.Y.Z, or X.Y.Z-suffix"
            exit 1
        fi
        ;;
esac

TAG_NAME="v$VERSION"

log_info "Starting release process for version $VERSION"

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

# Update version and build
log_info "Running version bump and build process..."
if [ -f "dev-bump-build-test.sh" ]; then
    # For auto-increment, we already updated package.json, so just run the rest
    if [[ "$VERSION_INPUT" =~ ^(patch|minor|major)$ ]]; then
        log_info "Package.json already updated to $VERSION, running build and test..."
        # Update version.js
        if [ -f "tools/updateVersion.js" ]; then
            node tools/updateVersion.js
        fi
        # Build and test
        npm run build
        npm run test:all
    else
        # For explicit versions, use the full script
        sh dev-bump-build-test.sh "$VERSION"
    fi
else
    log_warning "dev-bump-build-test.sh not found, running manual steps..."
    
    # Update package.json version (skip if already done for auto-increment)
    if [[ ! "$VERSION_INPUT" =~ ^(patch|minor|major)$ ]]; then
        npm version "$VERSION" --no-git-tag-version
    fi
    
    # Update version.js
    if [ -f "tools/updateVersion.js" ]; then
        node tools/updateVersion.js
    fi
    
    # Build
    npm run build
    
    # Test
    npm run test:all
fi

log_success "Build and tests completed"

# Check if package.json version matches
PACKAGE_VERSION=$(node -p "require('./package.json').version")
if [ "$PACKAGE_VERSION" != "$VERSION" ]; then
    log_error "Package.json version ($PACKAGE_VERSION) doesn't match target version ($VERSION)"
    exit 1
fi

log_success "Version verification passed"

# Commit version changes
log_info "Committing version changes..."
git add package.json package-lock.json src/version.js dist/
git commit -m "Release v$VERSION

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"

log_success "Changes committed"

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
echo "💡 Manual npm publish commands:"
echo "   npm publish --dry-run  # Review what will be published"
echo "   npm publish            # Actually publish"
echo ""

# Show dry-run info
log_info "Running npm publish --dry-run for review..."
npm publish --dry-run

echo ""
log_success "Release process completed! 🚀"