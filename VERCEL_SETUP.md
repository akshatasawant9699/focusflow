# ⚡ Quick Vercel Setup (5 minutes)

Follow these steps to get FocusFlow live on Vercel:

---

## Step 1: Create Turso Database (2 min)

```bash
# Install Turso CLI (if not already installed)
curl -sSfL https://get.tur.so/install.sh | bash

# Login
turso auth login

# Create database
turso db create focusflow

# Get URL (copy this!)
turso db show focusflow --url

# Create token (copy this too!)
turso db tokens create focusflow
```

**Save these two values** - you'll need them in Vercel!

---

## Step 2: Deploy to Vercel (2 min)

### Go to: https://vercel.com/new

1. Click **"Import Git Repository"**
2. Select: `akshatasawant9699/focusflow`
3. Click **"Import"**

### Configure Project:
- **Framework:** Next.js (auto-detected)
- **Root Directory:** `./`
- **Build Command:** `npm run build`

### Add Environment Variables:

Click **"Environment Variables"** and add these 2:

```
Name: TURSO_DATABASE_URL
Value: libsql://focusflow-your-name.turso.io
```

```
Name: TURSO_AUTH_TOKEN  
Value: eyJhbGc... (your token)
```

Click **"Deploy"** 🚀

---

## Step 3: Push Database Schema (1 min)

While Vercel is building, run this locally:

```bash
# Set environment variables (use your values!)
export TURSO_DATABASE_URL="libsql://focusflow-your-name.turso.io"
export TURSO_AUTH_TOKEN="eyJhbGc..."

# Push schema to Turso
npm run db:push
```

You should see: **✓ Everything's fine 🐶🔥**

---

## ✅ Done!

Your Vercel deployment will be ready at:
**`https://focusflow-your-name.vercel.app`**

### Test it:
1. Open your Vercel URL
2. Click a mood emoji
3. Paste some tasks
4. Create a plan
5. Start a focus session

---

## 🐛 If Something Goes Wrong

### Build fails on Vercel:
- Check that you pushed the latest code: `git push origin main`
- Rebuild: Vercel dashboard → Deployments → Three dots → Redeploy

### "Database tables not found" error:
- You forgot step 3! Run `npm run db:push` locally

### "Unauthorized" error:
- Check your `TURSO_AUTH_TOKEN` in Vercel settings
- Regenerate: `turso db tokens create focusflow`

---

## 🔄 Updating After Changes

```bash
# Local changes
git add -A
git commit -m "feat: your changes"
git push origin main

# Vercel auto-deploys! ✨
```

---

**That's it!** Your ADHD productivity app is now live! 🎉
