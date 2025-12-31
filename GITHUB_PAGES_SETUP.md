# GitHub Pages + PythonAnywhere Setup

## One-Time Setup (Takes 2 minutes)

### Step 1: Deploy Backend to PythonAnywhere
Follow: [PYTHONANYWHERE_DEPLOYMENT.md](PYTHONANYWHERE_DEPLOYMENT.md)

Once deployed, you'll have a URL like: `https://YOUR_USERNAME.pythonanywhere.com`

### Step 2: Add Secret to GitHub
1. Go to: https://github.com/trexzaighu-creator/stayhub/settings/secrets/actions
2. Click **New repository secret**
3. Name: `PYTHONANYWHERE_API_URL`
4. Value: `https://YOUR_USERNAME.pythonanywhere.com`
5. Click **Add secret**

### Step 3: Done! 🎉
- Every time you push to `main`, GitHub Actions automatically builds the frontend
- The build uses your `PYTHONANYWHERE_API_URL` secret
- Frontend deploys to GitHub Pages
- Frontend knows where to find the backend API

---

## How It Works

1. **You push code** to GitHub
2. **GitHub Actions triggers** automatically
3. **Build step** runs with `NEXT_PUBLIC_API_URL` set to your PythonAnywhere URL
4. **Next.js exports** the site with the API URL baked in
5. **Site deploys** to GitHub Pages
6. **Users visit** your site and all API calls go to PythonAnywhere

---

## Test Your Setup

After setup, visit: `https://trexzaighu-creator.github.io/stayhub`

If hostels load → ✅ Everything works!
If nothing loads → Check:
- PythonAnywhere is running (`Reload` button clicked)
- Secret name is correct: `PYTHONANYWHERE_API_URL`
- Secret value is correct: `https://YOUR_USERNAME.pythonanywhere.com`
- Django API is accessible

---

## Troubleshooting

**Frontend shows but no hostels load:**
- Open browser console (F12) → Network tab
- See what URL it's calling
- Make sure that URL is reachable

**CORS errors:**
- Check PythonAnywhere env vars include your GitHub Pages URL
- Should be: `CORS_ALLOWED_ORIGINS=https://trexzaighu-creator.github.io/stayhub`

**Want to change the backend URL?**
- Go to GitHub → Settings → Secrets → Edit `PYTHONANYWHERE_API_URL`
- Next push will use new URL automatically
