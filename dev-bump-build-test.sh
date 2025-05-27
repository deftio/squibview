#!/bin/bash

# Create tests directory if it doesn't exist
mkdir -p tests

# Redirect stdout and stderr to a log file and also to the terminal
exec > >(tee tests/log.out) 2>&1

echo "****************************************************************************************"
echo "****************************************************************************************"
echo ""


# Exit immediately if a command exits with a non-zero status.
set -e

echo "Starting dev-bump-build-test workflow..."

# 1. Bump the version in package.json using npm version with a pre-release identifier.
# This updates package.json but does NOT create a git commit or tag.
echo "Bumping version in package.json for development (e.g., X.Y.Z-dev.0)..."
# If current version is X.Y.Z, this makes it X.Y.(Z+1)-dev.0
# If current version is X.Y.Z-dev.N, this makes it X.Y.Z-dev.(N+1)
if grep -q "\-dev\." package.json; then
  npm version prerelease --preid dev --no-git-tag-version
elif grep -q "\-alpha\." package.json; then
  npm version prerelease --preid dev --no-git-tag-version
elif grep -q "\-beta\." package.json; then
  npm version prerelease --preid dev --no-git-tag-version
elif grep -q "\-rc\." package.json; then
  npm version prerelease --preid dev --no-git-tag-version
else
  # If it's a stable version (e.g., X.Y.Z or X.Y.Z.A), first increment the patch,
  # then add the -dev.0 prerelease identifier.
  echo "Current version is stable-like. Incrementing patch and adding -dev.0 prerelease..."
  npm version patch --no-git-tag-version
  npm version prerelease --preid dev --no-git-tag-version
fi

# 2. Sync the new version from package.json to src/version.js
echo "Syncing version from package.json to src/version.js..."
node ./tools/updateVersion.js

# 3. Build the ESM-only distribution
echo "Building ESM-only distribution..."
npm run build:esm-only

# 4. Run the preferred tests
echo "Running tests..."
npm test -- tests/SquibView.test.js

echo "dev-bump-build-test script completed successfully." 