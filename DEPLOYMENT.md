# Aurelle Care - Netlify Deployment Guide

## Environment Variables Required

Set these in your Netlify dashboard under Site Settings > Environment Variables:

### Frontend Variables (Required)
```
VITE_SUPABASE_URL=https://orawqdebazuhqpkzufxy.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9yYXdxZGViYXp1aHFwa3p1Znh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4NDQwNzEsImV4cCI6MjA2NzQyMDA3MX0.inPG4j47vN8438er8urENCFT62Nm4-RmlTk8xEAjEoE
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