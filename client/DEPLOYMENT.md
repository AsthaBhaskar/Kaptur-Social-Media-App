# Frontend Deployment Guide for Vercel

## Prerequisites
- Your backend is already deployed on Render at: https://kaptur-social-media-app.onrender.com
- You have a Vercel account
- Your code is pushed to a Git repository (GitHub, GitLab, or Bitbucket)

## Deployment Steps

### 1. Prepare Your Repository
Make sure all your changes are committed and pushed to your Git repository.

### 2. Deploy to Vercel

#### Option A: Deploy via Vercel Dashboard
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your Git repository
4. Configure the project:
   - **Framework Preset**: Create React App
   - **Root Directory**: `client` (since your React app is in the client folder)
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`

#### Option B: Deploy via Vercel CLI
1. Install Vercel CLI: `npm i -g vercel`
2. Navigate to your client directory: `cd client`
3. Run: `vercel`
4. Follow the prompts to configure your project

### 3. Environment Variables
Vercel will automatically use the configuration from `vercel.json`, which sets:
- `REACT_APP_API_URL=https://kaptur-social-media-app.onrender.com`

### 4. Build and Deploy
Vercel will automatically:
1. Install dependencies
2. Build your React app
3. Deploy to a production URL

### 5. Custom Domain (Optional)
- In your Vercel dashboard, go to your project settings
- Add your custom domain if desired

## Important Notes

- **API Base URL**: The app is configured to use your deployed backend at `https://kaptur-social-media-app.onrender.com`
- **CORS**: Ensure your backend allows requests from your Vercel domain
- **Environment Variables**: All API calls now use the centralized configuration from `config.js`

## Troubleshooting

### Build Errors
- Check that all dependencies are properly installed
- Verify that the build command works locally: `npm run build`

### API Connection Issues
- Verify your backend is running on Render
- Check that CORS is properly configured on your backend
- Test the API endpoints directly in your browser

### Image Loading Issues
- Ensure all image assets are properly uploaded to your backend
- Check that the image paths in your backend are correct

## Local Development
For local development, you can create a `.env.local` file in your client directory:
```
REACT_APP_API_URL=http://localhost:6001
```

This will override the production API URL when running locally.
