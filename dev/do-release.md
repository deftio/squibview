# SquibView Release Workflow (to npm)

This guide outlines the steps to create and publish a new release.
Replace `<VERSION>` with the actual version number (e.g., `1.0.1`).

## 0. Prerequisites

*   [ ] All feature development for this release is complete and merged into your release branch (e.g., `main` or a dedicated release preparation branch).
*   [ ] Your local repository is clean (`git status` shows no uncommitted changes beyond what's intended for the release).
*   [ ] You are on the branch you intend to release from (e.g., `git checkout main`).
*   [ ] Pull the latest changes for this branch: `git pull origin <branch-name>` (e.g., `git pull origin main`).

## 1. Set Version, Update Files, Initial Build & Test

This step uses the `dev-bump-build-test.sh` script. It will:
    1.  Update `package.json` to `<VERSION>`.
    2.  Update `package-lock.json`. (npm install --package-lock-only)
    3.  Run `tools/updateVersion.js` to generate `src/version.js`.
    4.  Run `npm run build:esm-only` (as per the script).
    5.  Run `npm test -- tests/SquibView.test.js` (as per the script).

```bash
sh dev-bump-build-test.sh <VERSION>
```
*   Example: `sh dev-bump-build-test.sh 1.0.1`

## 2. Full Production Build (If different from script's build)

The `dev-bump-build-test.sh` script runs `build:esm-only`. If your full production build is different (e.g., `npm run build` which might build multiple formats):

```bash
npm run build
```

## 3. Run All Tests

Ensure all tests pass before proceeding.

```bash
npm run test:all
```

## 4. Commit Version Update Changes

Commit the version changes made to `package.json`, `package-lock.json`, and `src/version.js`.

```bash
git add package.json package-lock.json src/version.js
git commit -m "Release v<VERSION>"
```
*   Example: `git commit -m "Release v1.0.1"`

## 5. Push Release Commit

Push the release commit to the remote repository (if you haven't already as part of feature merging).

```bash
git push origin <branch-name>
```
*   Example: `git push origin main`

## 6. Create Git Tag

Tag the release commit. Ensure you are on the correct commit before tagging.

```bash
git tag -a v<VERSION> -m "Version <VERSION>"
```
*   Example: `git tag -a v1.0.1 -m "Version 1.0.1"`

## 7. Push Tag to Remote

```bash
git push origin v<VERSION>
```
*   Example: `git push origin v1.0.1`

## 8. Create GitHub Release

Use the GitHub CLI to create the release on GitHub. This will use the tag you just pushed.

```bash
gh release create v<VERSION> --title "Version <VERSION>" --generate-notes --latest
```
*   Alternatively, to write custom notes directly:
    `gh release create v<VERSION> --title "Version <VERSION>" --notes "Your detailed release notes here." --latest`
*   You can also create/edit the release via the GitHub web UI if preferred.

## 9. Publish to npm

**Always do a dry run first!** This shows you what files will be published without actually publishing.

```bash
npm publish --dry-run
```
Review the output carefully. Check the file list and package version.

If the dry run is satisfactory:

```bash
npm publish
```

## 10. Post-Release (Optional Considerations)

*   If you used a separate release branch, merge it back into `main` (if not already done) and then into any active long-term development branches.
*   `git checkout main && git pull && git checkout <develop-branch> && git pull && git merge main`
*   Announce the new release to your users/community. 