# 🚀 Deployment Guide - FocusFlow on Vercel

This guide will help you deploy FocusFlow to Vercel with Turso (LibSQL) as the database.

---

## 📋 Prerequisites

1. **Vercel Account** - Sign up at [vercel.com](https://vercel.com)
2. **Turso Account** - Sign up at [turso.tech](https://turso.tech) (free tier available)
3. **GitHub Repository** - Your code should be pushed to GitHub

---

## 🗄️ Step 1: Set Up Turso Database

### Install Turso CLI:
```bash
# macOS/Linux
curl -sSfL https://get.tur.so/install.sh | bash

# Or with Homebrew
brew install tursodatabase/tap/turso
```

### Create Database:
```bash
# Login to Turso
turso auth login

# Create database
turso db create focusflow

# Get database URL
turso db show focusflow --url

# Create auth token
turso db tokens create focusflow
```

**Save these values:**
- `TURSO_DATABASE_URL` - The database URL (starts with `libsql://`)
- `TURSO_AUTH_TOKEN` - The auth token

---

## 🔧 Step 2: Push Schema to Turso

```bash
# Set environment variables locally (temporary)
export TURSO_DATABASE_URL="libsql://your-database-url.turso.io"
export TURSO_AUTH_TOKEN="your-auth-token"

# Push database schema
npm run db:push
```

You should see: `✓ Everything's fine 🐶🔥`

---

## ☁️ Step 3: Deploy to Vercel

### Option A: Vercel Dashboard (Easiest)

1. Go to [vercel.com/new](https://vercel.com/new)
2. **Import** your GitHub repository: `akshatasawant9699/focusflow`
3. Configure project:
   - **Framework Preset:** Next.js
   - **Root Directory:** `./` (leave default)
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next` (auto-detected)

4. **Add Environment Variables:**
   Click "Environment Variables" and add:
   ```
   TURSO_DATABASE_URL = libsql://your-database.turso.io
   TURSO_AUTH_TOKEN = your-token-here
   ```

5. Click **"Deploy"**

### Option B: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy (from project root)
vercel

# Set environment variables
vercel env add TURSO_DATABASE_URL
vercel env add TURSO_AUTH_TOKEN

# Deploy to production
vercel --prod
```

---

## 🔍 Step 4: Verify Deployment

1. Open your Vercel deployment URL
2. Test the flow:
   - ✅ Home page loads with mood tracker
   - ✅ Paste tasks and create plan
   - ✅ View plans in Today view
   - ✅ Start focus session
   - ✅ Complete steps

3. Check Vercel logs if errors occur:
   ```bash
   vercel logs
   ```

---

## 🐛 Troubleshooting

### "Cannot find module 'better-sqlite3'"
- **Fix:** The migration is already done. This error shouldn't occur with the new setup.

### "ENOENT: no such file or directory, open 'local.db'"
- **Cause:** `TURSO_DATABASE_URL` not set on Vercel
- **Fix:** Add environment variables in Vercel dashboard

### "Unauthorized" or "Authentication failed"
- **Cause:** Invalid `TURSO_AUTH_TOKEN`
- **Fix:** Regenerate token: `turso db tokens create focusflow`

### Database tables don't exist
- **Cause:** Schema not pushed to Turso
- **Fix:** Run `npm run db:push` locally with Turso env vars set

### Build succeeds but runtime errors
- **Check Vercel Function Logs:**
  - Go to Vercel dashboard → Deployments → Click latest → Logs tab
  - Look for API route errors

---

## 🔄 Continuous Deployment

After initial setup:
1. **Push to GitHub main branch**
2. **Vercel auto-deploys** (if connected)
3. No manual steps needed!

---

## 📊 Database Management

### View data in Turso:
```bash
turso db shell focusflow
```

SQL commands:
```sql
-- List all plans
SELECT * FROM plans;

-- List all steps
SELECT * FROM steps;

-- List all sessions
SELECT * FROM focus_sessions;

-- Count users
SELECT COUNT(*) FROM users;
```

### Reset database (careful!):
```bash
# Drop all tables and re-push schema
turso db shell focusflow "DROP TABLE IF EXISTS plans; DROP TABLE IF EXISTS steps; DROP TABLE IF EXISTS users; DROP TABLE IF EXISTS focus_sessions; DROP TABLE IF EXISTS parked_thoughts;"

npm run db:push
```

---

## 💰 Turso Pricing

**Free Tier Includes:**
- 500 databases
- 9 GB storage
- 1 billion row reads/month
- 25 million row writes/month

More than enough for MVP! 🎉

---

## 🎯 Next Steps

After successful deployment:
1. ✅ Share your Vercel URL
2. ✅ Test with real users
3. ✅ Set up custom domain (optional)
4. ✅ Enable Vercel Analytics
5. ✅ Monitor Turso usage

---

## 📝 Environment Variables Summary

**Required for Vercel:**
```env
TURSO_DATABASE_URL=libsql://your-database.turso.io
TURSO_AUTH_TOKEN=your-auth-token-here
```

**Local Development:**
- No env vars needed (uses `file:local.db`)
- Or set Turso vars to use production database locally

---

## 🔗 Useful Links

- **Vercel Dashboard:** [vercel.com/dashboard](https://vercel.com/dashboard)
- **Turso Dashboard:** [turso.tech/app](https://turso.tech/app)
- **Turso Docs:** [docs.turso.tech](https://docs.turso.tech)
- **Drizzle + Turso:** [orm.drizzle.team/docs/get-started-turso](https://orm.drizzle.team/docs/get-started-turso)

---

**Need help?** Check Vercel deployment logs or reach out! 🚀
