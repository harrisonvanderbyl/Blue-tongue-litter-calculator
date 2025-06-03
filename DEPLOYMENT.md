# Deployment Instructions

This document provides instructions for deploying the Blue-tongue Litter Calculator to GitHub Pages.

## Automatic Deployment (Recommended)

The project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Setup Steps:

1. **Push to GitHub**: Make sure your code is pushed to the `main` branch of your GitHub repository.

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click on "Settings" tab
   - Scroll down to "Pages" in the left sidebar
   - Under "Source", select "GitHub Actions"
   - Save the settings

3. **Automatic Deployment**: 
   - Every push to the `main` branch will automatically trigger a deployment
   - The GitHub Action will build the project and deploy it to GitHub Pages
   - You can monitor the deployment progress in the "Actions" tab of your repository

4. **Access Your Site**:
   - Once deployed, your site will be available at: `https://[your-username].github.io/Blue-tongue-litter-calculator/`
   - Replace `[your-username]` with your actual GitHub username

## Manual Deployment

If you prefer to deploy manually:

### Prerequisites:
- Node.js (v18 or higher)
- npm

### Steps:

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Build the Project**:
   ```bash
   npm run build
   ```

3. **Deploy the `dist` folder**:
   - Upload the contents of the `dist` folder to your web server
   - Or use GitHub Pages by pushing the `dist` folder to a `gh-pages` branch

## Configuration Notes

- The project is configured with the base path `/Blue-tongue-litter-calculator/` for GitHub Pages
- If deploying to a different location, update the `base` property in `vite.config.ts`
- The build outputs to the `dist` directory
- All assets are properly hashed for cache busting

## Troubleshooting

### Build Fails
- Ensure all dependencies are installed: `npm install`
- Check for TypeScript errors: `npm run build`
- Verify Node.js version is 18 or higher

### Deployment Fails
- Check that GitHub Pages is enabled in repository settings
- Verify the GitHub Action has proper permissions
- Check the Actions tab for detailed error logs

### Site Not Loading
- Verify the correct URL format: `https://[username].github.io/Blue-tongue-litter-calculator/`
- Check browser console for any errors
- Ensure all assets are loading correctly

## GitHub Actions Workflow

The deployment workflow (`.github/workflows/deploy.yml`) includes:

- **Build Job**: Installs dependencies, runs TypeScript compilation, and builds the project
- **Deploy Job**: Deploys the built files to GitHub Pages
- **Triggers**: Runs on every push to `main` branch
- **Permissions**: Configured for GitHub Pages deployment

The workflow uses the latest GitHub Actions and follows best practices for security and reliability.
