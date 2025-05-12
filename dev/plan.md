# SquibView Development Plan

## Development Rules

1. **Test Coverage**
   - Every new function added to `squibview.js` must have a corresponding test case
   - Tests should be added to the appropriate test suite in `/e2e-tests/`
   - Test cases should cover both success and failure scenarios

2. **Documentation**
   - All new features must be documented
   - Documentation should be updated in both code comments and external docs
   - All functions must have proper JSDoc strings including:
     - Description
     - Parameters
     - Return values
     - Examples where appropriate

3. **Version Control**
   - Every change to `squibview.js` source files requires a version increment
   - Version format: `0.0.XX` for minor changes, `0.X.0` for feature changes, `X.0.0` for major changes
   - Version must be updated in:
     - `src/squibview.js`
     - `package.json`
     - Any other relevant files via `npm run updateVersion`

4. **Code Quality**
   - All code must pass linting
   - All tests must pass before committing
   - No breaking changes without major version increment

## Current Tasks

### 1. React Example Implementation
- Create a new React example in `/examples/`
- Demonstrate basic SquibView integration with React
- Include example of props and event handling
- Add documentation for React usage
- Ensure example works with both development and production builds

### 2. Standalone ESM Build
- Create new Rollup configuration for standalone ESM build
- Bundle all dependencies (mermaid, highlight.js, etc.)
- Ensure proper tree-shaking
- Add build script to `package.json`
- Update documentation with ESM usage instructions

### 3. Standalone ESM Example
- Create new example in `/examples/` using standalone ESM build
- Demonstrate proper module import
- Show how to use with modern bundlers
- Include documentation for ESM usage
- Ensure example works in modern browsers

### 4. Image Source Control Feature
#### Analysis Required:
- Current behavior: Images in rendered view become binary data in source
- Desired behavior: Option to maintain original image links
- Implementation considerations:
  - New configuration option for image handling
  - Impact on existing functionality
  - Performance implications
  - Browser compatibility
  - Security considerations
  - Memory usage impact
  - Documentation requirements

## Task Process
- Only one task will be worked on at a time
- Each task must be completed and tested before moving to the next
- Tasks will be taken in order unless dependencies require otherwise
- Each task completion requires:
  - Working code
  - Passing tests
  - Updated documentation
  - Version increment if source files modified 