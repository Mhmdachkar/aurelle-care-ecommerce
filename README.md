# Aurelle Care - Luxury Skincare E-commerce Platform

A modern, full-featured e-commerce website for Aurelle Care luxury skincare products. Built with React, TypeScript, Supabase, and Stripe for seamless online shopping experience.

## 🌐 **Live Website**
**URL**: https://aurelle-care.com

## 🚀 **Deployment Status**
✅ **Production Ready** - Fully deployed on Netlify with optimized performance

## 📋 **Project Overview**

Aurelle Care is a premium skincare e-commerce platform featuring:

### **Core Features**
- **Secure Authentication** - User registration/login with Supabase Auth
- **Shopping Cart** - Guest and authenticated user cart management
- **Payment Processing** - Stripe integration with secure checkout
- **Order Management** - Complete order tracking and management
- **Analytics Dashboard** - Real-time sales and visitor analytics
- **Meta Pixel Integration** - Advanced e-commerce tracking
- **Responsive Design** - Mobile-first, modern UI with shadcn/ui
- **Performance Optimized** - Fast loading with Vite and optimized assets

### **Advanced Features**
- **Guest Checkout** - No registration required for purchases
- **Customer Segmentation** - Automated customer lifecycle management
- **Visitor Tracking** - Comprehensive analytics and conversion tracking
- **Email Notifications** - Automated order confirmations and updates
- **Security Headers** - Enterprise-grade security configuration
- **SEO Optimized** - Meta tags, Open Graph, and structured data

## 🛠 **Technology Stack**

### **Frontend**
- **React 18** - Modern UI framework
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Beautiful, accessible components
- **React Router** - Client-side routing
- **React Hook Form** - Form management
- **React Query** - Server state management

### **Backend & Database**
- **Supabase** - Backend-as-a-Service
  - PostgreSQL database
  - Real-time subscriptions
  - Row Level Security (RLS)
  - Edge Functions
- **Stripe** - Payment processing
- **Meta Pixel** - Analytics and conversion tracking

### **Deployment & Infrastructure**
- **Netlify** - Hosting and CDN
- **GitHub** - Version control
- **Environment Variables** - Secure configuration management

## 📊 **Database Schema**

The platform includes a comprehensive database with:

- **User Management** - Profiles, authentication, preferences
- **Order System** - Orders, items, payments, shipping
- **Analytics** - Events, page views, conversions, sessions
- **Customer Data** - Segmentation, lifetime value, preferences
- **Performance Monitoring** - Metrics, health checks, audits

## 🚀 **Getting Started**

### **Prerequisites**
- Node.js 20+ and npm
- Git

### **Local Development**

```bash
# Clone the repository
git clone <YOUR_GIT_URL>
cd aurella-luxe-reveal-main

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### **Environment Variables**

Create a `.env` file with the following variables:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

## 🏗 **Build & Deployment**

### **Build Commands**
```bash
# Development build
npm run build:dev

# Production build
npm run build

# Preview build
npm run preview
```

### **Netlify Deployment**
The project is configured for automatic deployment on Netlify with:
- Build command: `npm run build`
- Publish directory: `dist`
- Node version: `20`
- Security headers and caching optimized

## 📈 **Analytics & Tracking**

- **Meta Pixel Integration** - E-commerce event tracking
- **Visitor Analytics** - Page views, session tracking
- **Conversion Funnel** - Purchase path analysis
- **Performance Monitoring** - Core Web Vitals tracking
- **Customer Segmentation** - Automated lifecycle management

## 🔒 **Security Features**

- **HTTPS Enforcement** - Secure connections only
- **Security Headers** - XSS protection, content type validation
- **Row Level Security** - Database-level access control
- **Environment Variables** - Secure credential management
- **Input Validation** - Form and data validation
- **CORS Configuration** - Cross-origin request protection

## 📱 **Mobile Optimization**

- **Responsive Design** - Mobile-first approach
- **Touch-Friendly** - Optimized for mobile interaction
- **Fast Loading** - Optimized images and assets
- **PWA Ready** - Progressive Web App capabilities

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 **License**

This project is proprietary software for Aurelle Care.

## 📞 **Support**

For technical support or questions about the platform, please contact the development team.

---

**Built with ❤️ for Aurelle Care**
