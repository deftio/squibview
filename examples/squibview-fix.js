// squibview-fix.js
// This script fixes the UMD module loading issues

// Make sure 'module' is defined in the browser context
if (typeof module === 'undefined') {
  var module = { exports: {} };
}

// After loading the UMD script, make sure SquibView is properly defined
function initSquibView() {
  if (typeof SquibView === 'object' && SquibView.__esModule) {
    window.SquibView = SquibView.default || SquibView;
  }
}

// Auto-run the init function when the page loads
if (typeof window !== 'undefined') {
  window.addEventListener('load', initSquibView);
}