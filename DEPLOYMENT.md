# Aurelle Care - Netlify Deployment Guide

## Environment Variables Required

Set these in your Netlify dashboard under Site Settings > Environment Variables:

### Frontend Variables (Required)
```
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key_here
```

### Build Settings
- Build command: `npm run build`
- Publish directory: `dist`
- Node version: `18`

## Deployment Steps

1. Push your code to GitHub/GitLab
2. Connect repository to Netlify
3. Set environment variables
4. Deploy!

## Post-Deployment Checklist

1. ✅ Test user registration/login
2. ✅ Test cart functionality (add/remove items)
3. ✅ Test guest checkout
4. ✅ Test authenticated user checkout
5. ✅ Verify email notifications work
6. ✅ Test on mobile devices
7. ✅ Check all images load correctly

## Security Notes

- Supabase anon key is safe to expose (public key)
- Stripe publishable key is safe to expose (public key)
- All sensitive keys are in Supabase Edge Functions (server-side)
- HTTPS is enforced by Netlify
- Security headers are configured in netlify.toml 