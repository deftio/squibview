#!/bin/bash

# bump-version.sh
# Simple helper to bump version in package.json
# Usage: ./tools/bump-version.sh <patch|minor|major|version>

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

if [ $# -ne 1 ]; then
    echo "Usage: $0 <patch|minor|major|version>"
    echo ""
    echo "Examples:"
    echo "  $0 patch      # 1.0.4 → 1.0.5"
    echo "  $0 minor      # 1.0.4 → 1.1.0"  
    echo "  $0 major      # 1.0.4 → 2.0.0"
    echo "  $0 1.0.5      # Set specific version"
    echo ""
    echo "Then run: npm run prerelease"
    exit 1
fi

CURRENT_VERSION=$(node -p "require('./package.json').version")
echo -e "${BLUE}Current version: $CURRENT_VERSION${NC}"

if [[ "$1" =~ ^(patch|minor|major)$ ]]; then
    NEW_VERSION=$(npm version "$1" --no-git-tag-version)
    NEW_VERSION=${NEW_VERSION#v}  # Remove 'v' prefix
else
    npm version "$1" --no-git-tag-version
    NEW_VERSION="$1"
fi

echo -e "${GREEN}Updated to: $NEW_VERSION${NC}"
echo ""
echo "Next steps:"
echo "  1. npm run prerelease"
echo "  2. ./tools/make-release.sh \"release notes\""