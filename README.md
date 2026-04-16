# Janneh Mini-Mart

Janneh Mini-Mart is an Electron desktop app built with Vite and React.

## Local development

Prerequisites:

- Node.js

Install dependencies:

```bash
npm install
```

Run the web app only:

```bash
npm run dev
```

Run the Electron desktop app in development:

```bash
npm run electron:dev
```

## Build the desktop app

Create a local installer:

```bash
npm run electron:build
```

The generated Windows installer is written to `release/`.

## Auto-update setup

This project is configured to use:

- `electron-updater`
- `electron-builder`
- GitHub Releases as the update provider
- `NSIS` on Windows, which supports in-app auto-updates

Important:

- Users must install the app with the generated setup `.exe`, not run the unpacked app folder.
- Pushing source code to GitHub is not enough for desktop updates.
- Auto-updates come from GitHub Releases that contain the installer, blockmap, and `latest.yml`.

## Releasing a new update

1. Update the app version in `package.json`.
2. Commit and push your changes to GitHub.
3. Create and push a tag that matches the version, for example `v1.1.2`.

```bash
git tag v1.1.2
git push origin v1.1.2
```

4. GitHub Actions will build the Windows installer and publish the release artifacts.
5. Installed users will be prompted inside the app when the update is downloaded.

## GitHub Actions requirements

The release workflow uses the repository `GITHUB_TOKEN` and needs GitHub Actions enabled for the repository.

Workflow file:

- `.github/workflows/release.yml`

## Publish manually from your own computer

If you want to publish directly from your machine instead of GitHub Actions:

```bash
$env:GH_TOKEN="your_github_token"
npm run electron:publish
```

That command builds the app and uploads the release artifacts to GitHub Releases.
