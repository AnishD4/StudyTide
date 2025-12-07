# 🚀 DEPLOYMENT GUIDE - StudyTide

## Pre-Deployment Checklist

### ✅ 1. Verify Local Build
```bash
npm run build
```
Should complete without errors. Warnings are okay.

### ✅ 2. Test Critical Features Locally
```bash
npm run dev
```

Then test:
- [ ] Navigation dropdowns (Academic & Track)
- [ ] Generate test with AI
- [ ] Create assignment (check time/difficulty estimation)
- [ ] Generate flashcards
- [ ] Create study guide
- [ ] Calendar shows assignments
- [ ] Settings tabs all work

### ✅ 3. Environment Variables Required

**Supabase** (Required):
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...
```

**Gemini AI** (Required for AI features):
```env
GEMINI_API_KEY=AIzaxxx...
```

---

## 🗄️ Database Setup

### Step 1: Run SQL Migrations in Supabase

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Click **SQL Editor** → **New Query**

### Step 2: Run These SQL Files in Order

#### File 1: `supabase/schema.sql`
Creates base tables (users, profiles, classes, etc.)

#### File 2: `supabase/study-tools-setup.sql`
Creates:
- `assignments` table
- `flashcards` table
- `study_guides` table
- `ai_chat_history` table ⭐ NEW
- All RLS policies
- Indexes

Run this SQL:
```sql
-- Run the entire contents of supabase/study-tools-setup.sql
```

#### File 3: `supabase/progress-habits-setup.sql`
Creates progress tracking tables

### Step 3: Verify Tables Created
In Supabase → **Table Editor**, you should see:
- assignments
- flashcards
- study_guides
- ai_chat_history
- study_sessions
- habits
- daily_checkins
- notifications
- classes
- extracurriculars

---

## 🔐 Google Sign-In Setup

### Step 1: Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create project or select existing
3. Enable **Google+ API**
4. Go to **Credentials** → Create Credentials → **OAuth 2.0 Client ID**
5. Application type: **Web application**
6. Add Authorized redirect URIs:
   ```
   https://your-project.supabase.co/auth/v1/callback
   http://localhost:3000/auth/callback
   ```
7. Copy **Client ID** and **Client Secret**

### Step 2: Configure Supabase

1. Supabase Dashboard → **Authentication** → **Providers**
2. Find **Google**, click to expand
3. Enable Google provider
4. Paste **Client ID** and **Client Secret**
5. Click **Save**

### Step 3: Add Redirect URLs

In **Authentication** → **URL Configuration**:
```
Site URL: https://your-app.vercel.app

Redirect URLs:
- https://your-app.vercel.app/auth/callback
- https://your-app.vercel.app
- http://localhost:3000/auth/callback
- http://localhost:3000
```

---

## 📦 Vercel Deployment

### Option 1: GitHub Auto-Deploy (Recommended)

1. Push code to GitHub:
   ```bash
   git add .
   git commit -m "feat: complete StudyTide with all features"
   git push origin main
   ```

2. Go to [Vercel Dashboard](https://vercel.com)
3. Click **Add New** → **Project**
4. Import your GitHub repository
5. Configure:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
6. Add Environment Variables (see below)
7. Click **Deploy**

### Option 2: Vercel CLI

```bash
npm i -g vercel
vercel login
vercel --prod
```

### Environment Variables in Vercel

Go to **Project Settings** → **Environment Variables**:

```
NEXT_PUBLIC_SUPABASE_URL = https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJxxx...
SUPABASE_SERVICE_ROLE_KEY = eyJxxx...
GEMINI_API_KEY = AIzaxxx...
```

✅ Apply to: **Production, Preview, and Development**

---

## 🧪 Post-Deployment Testing

### 1. Authentication
- [ ] Sign up with email works
- [ ] Sign in with email works
- [ ] Sign in with Google works
- [ ] Sign out works
- [ ] User sees correct greeting in nav

### 2. Navigation
- [ ] All main links work (Home, Dashboard, Calendar)
- [ ] Academic dropdown opens and all links work
- [ ] Track dropdown opens and all links work
- [ ] Settings link works
- [ ] Mobile menu works on phone

### 3. Assignments
- [ ] Can create assignment
- [ ] AI estimates time (e.g., "research paper" → ~10 hours)
- [ ] AI estimates difficulty (1-10 scale)
- [ ] Assignment saves to database
- [ ] Assignment appears on calendar
- [ ] Can mark as complete
- [ ] Completed shows with ✅ on calendar

### 4. Study Tools (Test Generation)
- [ ] Can generate test from topic
- [ ] Can upload PDF/text file
- [ ] Test generates with questions
- [ ] Can take test and submit
- [ ] Shows score/results
- [ ] Can chat with AI about mistakes
- [ ] AI remembers test context
- [ ] Can generate follow-up test on weak areas

### 5. Flashcards
- [ ] Can generate flashcards from topic
- [ ] Flashcards save to database
- [ ] Can view saved flashcards
- [ ] Can study flashcards

### 6. Study Guides
- [ ] Can generate study guide
- [ ] Guide has proper sections
- [ ] Guide saves to database
- [ ] Can view saved guides

### 7. Calendar
- [ ] Shows current month
- [ ] Can navigate months
- [ ] Assignments appear on correct dates
- [ ] Completed assignments show ✅
- [ ] Can add manual events
- [ ] Can click dates to add events

### 8. Settings
- [ ] All 4 tabs load
- [ ] Study preferences save
- [ ] Notification preferences save
- [ ] AI preferences save
- [ ] Display preferences save
- [ ] Settings persist after reload

### 9. Progress Tracking
- [ ] Can view progress stats
- [ ] Streak tracking works
- [ ] Study sessions log
- [ ] Goals tracking
- [ ] Reflections save

---

## 🐛 Troubleshooting

### Build Fails
**Error**: `EPERM: operation not permitted`
```bash
# Clear .next folder
rm -rf .next
# Or on Windows
Remove-Item -Recurse -Force .next
npm run build
```

### API Routes Return 500
**Check**:
1. Environment variables set in Vercel
2. Supabase tables created
3. RLS policies enabled
4. Check Vercel function logs

### Test Generation Fails
**Check**:
1. `GEMINI_API_KEY` is set
2. Check Vercel logs for Gemini errors
3. Try with shorter/simpler topic
4. Verify API key is valid

### Assignment Estimation Fails
**Check**:
1. `GEMINI_API_KEY` is set
2. Assignment has a title
3. Check console for AI response
4. Falls back to generic estimate if AI fails

### Google Sign-In Doesn't Work
**Check**:
1. Google provider enabled in Supabase
2. Client ID/Secret correct
3. Redirect URLs match exactly
4. Site URL configured

### Calendar Doesn't Show Assignments
**Check**:
1. User is logged in
2. Assignments exist in database
3. Assignments have `due_date` field
4. Check browser console for errors

---

## 📊 Performance Optimization

### After Deployment:

1. **Enable Caching** in Vercel:
   - Go to Project Settings → **Caching**
   - Enable for static assets

2. **Check Bundle Size**:
   ```bash
   npm run build
   # Look for bundle size warnings
   ```

3. **Monitor Function Usage**:
   - Vercel Dashboard → **Analytics**
   - Check function execution times
   - Optimize slow API routes

4. **Database Indexes**:
   - Already created in migration
   - Monitor slow queries in Supabase

---

## 📈 Monitoring

### Vercel Analytics
- Real-time visitor tracking
- Performance metrics
- Function logs

### Supabase Logs
- Database queries
- Auth events
- API usage

### Browser Console
- Client-side errors
- API response times
- React warnings

---

## 🎯 Feature Flags

If a feature isn't working, you can disable it temporarily:

### Disable AI Features
Set `GEMINI_API_KEY` to empty string - app will use fallbacks

### Disable Google Sign-In
Remove from login/signup pages or disable provider in Supabase

---

## ✅ Final Checklist

Before going live:
- [ ] All environment variables set
- [ ] Database tables created
- [ ] Google OAuth configured
- [ ] Build succeeds locally
- [ ] Deployed to Vercel
- [ ] Tested authentication
- [ ] Tested all major features
- [ ] Mobile responsiveness checked
- [ ] Error monitoring set up

---

## 🎉 You're Live!

Your StudyTide app is now deployed and ready for users!

**App URL**: `https://your-app.vercel.app`

### Share with users:
- Landing page: `/`
- Sign up: `/signup`
- Dashboard: `/dashboard` (after login)

### Monitor:
- Vercel Dashboard: Analytics & Logs
- Supabase Dashboard: Database & Auth
- Google Cloud Console: OAuth usage

---

## 🆘 Need Help?

### Check Logs:
1. **Vercel Logs**: Project → Functions → View logs
2. **Supabase Logs**: Dashboard → Logs
3. **Browser Console**: F12 → Console tab

### Common Issues:
- 401 Unauthorized: Check auth token
- 500 Server Error: Check environment variables
- 404 Not Found: Check route spelling
- Build failed: Clear `.next` folder

---

**Deployment Complete!** 🚀

Your StudyTide app with AI-powered features is now live and ready to help students succeed! 🌊📚

