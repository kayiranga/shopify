# Cloudinary Setup Guide

## Steps to Set Up Cloudinary

1. **Create a Cloudinary Account**
   - Go to https://cloudinary.com/
   - Sign up for a free account

2. **Get Your Credentials**
   - After signing up, go to your Dashboard
   - You'll see your credentials:
     - Cloud Name
     - API Key
     - API Secret

3. **Add Credentials to `.env.local`**
   
   Add these three environment variables to your `.env.local` file:

   ```env
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

   **Important Notes:**
   - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` uses `NEXT_PUBLIC_` prefix because it's used in client-side code
   - `CLOUDINARY_API_KEY` and `CLOUDINARY_API_SECRET` should NOT have the `NEXT_PUBLIC_` prefix (they're server-side only)

4. **Example `.env.local` file:**

   ```env
   MONGODB_URI=mongodb+srv://shopify:95Icte8UrwdFnA7s@shopify.grtq395.mongodb.net/shopify?retryWrites=true&w=majority
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=123456789012345
   CLOUDINARY_API_SECRET=abcdefghijklmnopqrstuvwxyz123456
   ```

5. **Restart Your Development Server**
   
   After adding the environment variables, restart your Next.js dev server:
   ```bash
   npm run dev
   ```

## How It Works

- When you upload an image in the create product form, it's uploaded to Cloudinary
- Cloudinary returns a secure URL for the image
- This URL is stored in MongoDB along with the product data
- Images are organized in a folder called `shopify-products` in your Cloudinary account

## Free Tier Limits

Cloudinary's free tier includes:
- 25 GB storage
- 25 GB bandwidth per month
- Unlimited transformations

This should be sufficient for development and small projects.

