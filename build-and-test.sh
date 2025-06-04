#!/bin/bash

echo "****************************************************************************************"
echo "****************************************************************************************"
echo ""

echo "Building and testing SquibView..."

# Exit immediately if a command exits with a non-zero status.
set -e

# 1. Sync the version from src/version.js to package.json
# (Assumes src/version.js has been manually updated by the user)
echo "Syncing version from src/version.js to package.json..."
node ./tools/updateVersion.js

# 2. Build the ESM-only distribution
echo "Building ESM-only distribution..."
npm run build:esm-only

# 3. Run the preferred tests
echo "Running tests..."
npm test -- tests/SquibView.test.js

echo "Script completed successfully." 