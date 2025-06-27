#!/usr/bin/env node

/**
 * rebuild-docs.js
 * Rebuilds all documentation HTML files using squibv CLI
 * Replaces the old docbat-based makeIndexHTML process
 */

import { execSync } from 'child_process';
import { existsSync, mkdirSync, readdirSync, statSync } from 'fs';
import { join, dirname, extname, relative } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// Configuration
const config = {
  // Root README.md -> index.html
  rootFiles: [
    { input: 'README.md', output: 'index.html' }
  ],
  
  // Documentation directories to process
  docsDirectories: [
    'docs'
  ],
  
  // squibv options for different file types
  squibvOptions: {
    // Options for root index.html (convert md links since README.md links to docs)
    root: '--convert-md-links',
    
    // Options for documentation files (convert .md links to .html)
    docs: '--convert-md-links'
  }
};

/**
 * Main rebuild function
 */
async function rebuildDocs() {
  console.log('🔧 Rebuilding documentation with squibv...\n');
  
  try {
    // Build root files (README.md -> index.html)
    await buildRootFiles();
    
    // Build documentation directories
    for (const docsDir of config.docsDirectories) {
      await buildDocsDirectory(docsDir);
    }
    
    console.log('\n✅ Documentation rebuild complete!');
    
  } catch (error) {
    console.error('\n❌ Documentation rebuild failed:', error.message);
    process.exit(1);
  }
}

/**
 * Build root files like README.md -> index.html
 */
async function buildRootFiles() {
  console.log('📄 Building root files...');
  
  for (const file of config.rootFiles) {
    const inputPath = join(rootDir, file.input);
    const outputPath = join(rootDir, file.output);
    
    if (!existsSync(inputPath)) {
      console.warn(`⚠️  Warning: ${file.input} not found, skipping...`);
      continue;
    }
    
    console.log(`   ${file.input} → ${file.output}`);
    
    try {
      const cmd = `node cli/bin/squibv.js "${inputPath}" -o "${outputPath}" ${config.squibvOptions.root}`.trim();
      execSync(cmd, { 
        cwd: rootDir, 
        stdio: ['pipe', 'pipe', 'inherit'] 
      });
    } catch (error) {
      throw new Error(`Failed to build ${file.input}: ${error.message}`);
    }
  }
}

/**
 * Build all markdown files in a documentation directory
 * @param {string} docsDir - Documentation directory name
 */
async function buildDocsDirectory(docsDir) {
  const docsDirPath = join(rootDir, docsDir);
  
  if (!existsSync(docsDirPath)) {
    console.warn(`⚠️  Warning: ${docsDir} directory not found, skipping...`);
    return;
  }
  
  console.log(`\n📚 Building ${docsDir}/ directory...`);
  
  // Recursively find all .md files
  const markdownFiles = findMarkdownFiles(docsDirPath);
  
  if (markdownFiles.length === 0) {
    console.log(`   No markdown files found in ${docsDir}/`);
    return;
  }
  
  // Build each markdown file
  for (const mdFile of markdownFiles) {
    const relativePath = relative(docsDirPath, mdFile);
    const htmlFile = mdFile.replace(/\.md$/, '.html');
    const relativeHtmlPath = relativePath.replace(/\.md$/, '.html');
    
    console.log(`   ${relativePath} → ${relativeHtmlPath}`);
    
    try {
      const cmd = `node cli/bin/squibv.js "${mdFile}" -o "${htmlFile}" ${config.squibvOptions.docs}`.trim();
      execSync(cmd, { 
        cwd: rootDir, 
        stdio: ['pipe', 'pipe', 'inherit'] 
      });
    } catch (error) {
      throw new Error(`Failed to build ${relativePath}: ${error.message}`);
    }
  }
  
  console.log(`   ✓ Built ${markdownFiles.length} files in ${docsDir}/`);
}

/**
 * Recursively find all .md files in a directory
 * @param {string} dirPath - Directory to search
 * @returns {string[]} - Array of .md file paths
 */
function findMarkdownFiles(dirPath) {
  const files = [];
  
  function traverse(currentPath) {
    const items = readdirSync(currentPath);
    
    for (const item of items) {
      const itemPath = join(currentPath, item);
      const stat = statSync(itemPath);
      
      if (stat.isDirectory()) {
        // Recursively search subdirectories
        traverse(itemPath);
      } else if (stat.isFile() && extname(item).toLowerCase() === '.md') {
        files.push(itemPath);
      }
    }
  }
  
  traverse(dirPath);
  return files.sort(); // Sort for consistent ordering
}

/**
 * Create navigation index files for documentation sections
 * This generates index.html files for directories that contain documentation
 */
async function createNavigationIndexes() {
  console.log('\n🗺️  Creating navigation indexes...');
  
  for (const docsDir of config.docsDirectories) {
    const docsDirPath = join(rootDir, docsDir);
    
    if (!existsSync(docsDirPath)) continue;
    
    // Find all subdirectories
    const items = readdirSync(docsDirPath);
    const subdirs = items.filter(item => {
      const itemPath = join(docsDirPath, item);
      return statSync(itemPath).isDirectory();
    });
    
    // Create index files for subdirectories that contain .md files
    for (const subdir of subdirs) {
      const subdirPath = join(docsDirPath, subdir);
      const markdownFiles = findMarkdownFiles(subdirPath);
      
      if (markdownFiles.length > 0) {
        await createSectionIndex(docsDir, subdir, markdownFiles);
      }
    }
  }
}

/**
 * Create an index.html file for a documentation section
 * @param {string} docsDir - Parent docs directory
 * @param {string} section - Section name (subdirectory)
 * @param {string[]} markdownFiles - Array of markdown file paths in the section
 */
async function createSectionIndex(docsDir, section, markdownFiles) {
  const sectionTitle = section.charAt(0).toUpperCase() + section.slice(1);
  const sectionPath = join(rootDir, docsDir, section);
  
  // Generate markdown content for the index
  let indexContent = `# ${sectionTitle}\n\n`;
  indexContent += `This section contains the following documentation:\n\n`;
  
  // Add links to each file
  for (const mdFile of markdownFiles) {
    const fileName = relative(sectionPath, mdFile);
    const htmlFileName = fileName.replace(/\.md$/, '.html');
    const title = fileName.replace(/\.md$/, '').replace(/^\d+-/, '').replace(/-/g, ' ');
    const capitalizedTitle = title.charAt(0).toUpperCase() + title.slice(1);
    
    indexContent += `- [${capitalizedTitle}](./${htmlFileName})\n`;
  }
  
  indexContent += `\n[← Back to Documentation Home](../home.html)\n`;
  
  // Write temporary markdown file
  const tempMdPath = join(sectionPath, 'index.md');
  const indexHtmlPath = join(sectionPath, 'index.html');
  
  try {
    const { writeFileSync, unlinkSync } = await import('fs');
    writeFileSync(tempMdPath, indexContent);
    
    console.log(`   Creating ${docsDir}/${section}/index.html`);
    
    const cmd = `node cli/bin/squibv.js "${tempMdPath}" -o "${indexHtmlPath}" ${config.squibvOptions.docs}`.trim();
    execSync(cmd, { 
      cwd: rootDir, 
      stdio: ['pipe', 'pipe', 'inherit'] 
    });
    
    // Clean up temporary file
    unlinkSync(tempMdPath);
    
  } catch (error) {
    throw new Error(`Failed to create index for ${docsDir}/${section}: ${error.message}`);
  }
}

// Run the script if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  rebuildDocs()
    .then(() => {
      // Also create navigation indexes
      return createNavigationIndexes();
    })
    .catch(error => {
      console.error('❌ Error:', error.message);
      process.exit(1);
    });
}

export { rebuildDocs };