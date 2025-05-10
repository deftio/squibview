import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { VERSION } from '../src/version.js'; // Import directly from version.js

// Get __dirname for ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the package.json file
const packageJsonPath = path.join(__dirname, '../package.json');

async function updateVersion() {
  try {
    const currentVersion = VERSION; // Use the imported constant
    console.log('Version from src/version.js:', currentVersion);

    // Read the existing package.json file
    const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf8'));

    // Update the version
    packageJson.version = currentVersion;

    // Write the updated package.json file back to disk
    await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8');

    console.log(`Updated package.json to version ${currentVersion}`);
  } catch (error) {
    console.error('Error updating version:', error);
    process.exit(1); // Exit with error code if update fails
  }
}

updateVersion();
