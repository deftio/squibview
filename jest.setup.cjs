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

// Mock ResizeObserver for tests
global.ResizeObserver = class ResizeObserver {
  constructor(callback) {
    this.callback = callback;
    this.observations = [];
  }

  observe(target) {
    this.observations.push(target);
    // Trigger callback immediately for testing
    if (this.callback) {
      this.callback([{
        target,
        contentRect: {
          x: 0,
          y: 0,
          width: 800,
          height: 600,
          top: 0,
          right: 800,
          bottom: 600,
          left: 0
        },
        borderBoxSize: [{
          inlineSize: 800,
          blockSize: 600
        }],
        contentBoxSize: [{
          inlineSize: 800,
          blockSize: 600
        }],
        devicePixelContentBoxSize: [{
          inlineSize: 800,
          blockSize: 600
        }]
      }], this);
    }
  }

  unobserve(target) {
    this.observations = this.observations.filter(obs => obs !== target);
  }

  disconnect() {
    this.observations = [];
  }
};