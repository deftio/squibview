// Suppress specific Node.js deprecation warnings
const originalWarn = process.emitWarning;
process.emitWarning = (warning, ...args) => {
  // Check if this is the punycode deprecation warning
  if (typeof warning === 'string' && warning.includes('The `punycode` module is deprecated')) {
    return; // Suppress this warning
  }
  return originalWarn.call(process, warning, ...args);
};

// Set global test timeout
jest.setTimeout(30000);