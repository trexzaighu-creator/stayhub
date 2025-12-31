# PythonAnywhere Deployment Guide

## Step-by-Step Setup

### 1. Create PythonAnywhere Account
- Go to https://www.pythonanywhere.com
- Click "Start running Python online in less than a minute"
- Sign up for FREE account
- Verify email

### 2. Upload Your Code
- In PythonAnywhere dashboard, go to **Files**
- Create a folder called `stayhub` 
- Upload your `backend_django` folder into it

### 3. Create Virtual Environment
- Open **Bash console** in PythonAnywhere
- Run:
```bash
cd /home/YOUR_USERNAME/stayhub
python3.10 -m venv venv
source venv/bin/activate
pip install -r backend_django/requirements.txt
```

### 4. Configure Web App
- Go to **Web** tab
- Click "Add a new web app"
- Choose **Manual configuration** → **Python 3.10**
- After creation, edit the WSGI configuration file

### 5. Edit WSGI File
In PythonAnywhere **Web** tab, click the WSGI file link and replace contents with:

```python
import os
import sys

path = '/home/YOUR_USERNAME/stayhub/backend_django'
if path not in sys.path:
    sys.path.insert(0, path)

os.environ['DJANGO_SETTINGS_MODULE'] = 'backend_django.settings'

from django.core.wsgi import get_wsgi_application
from django.contrib.staticfiles.handlers import StaticFilesHandler

application = StaticFilesHandler(get_wsgi_application())
```

### 6. Set Virtualenv Path
In **Web** tab:
- Find **Virtualenv** section
- Set to: `/home/YOUR_USERNAME/stayhub/venv`

### 7. Add Environment Variables
In **Web** tab, scroll down and add:
```
DJANGO_SECRET_KEY=your-secret-key-12345
DEBUG=False
ALLOWED_HOSTS=YOUR_USERNAME.pythonanywhere.com
CORS_ALLOWED_ORIGINS=https://trexzaighu-creator.github.io/stayhub
```

### 8. Migrate Database
- Open **Bash console**
- Run:
```bash
cd /home/YOUR_USERNAME/stayhub/backend_django
python manage.py migrate
python manage.py createsuperuser
```

### 9. Reload Web App
- Go to **Web** tab
- Click green **Reload** button at top

### 10. Test Your API
Your backend URL will be: `https://YOUR_USERNAME.pythonanywhere.com`

Test it:
- Homepage: `https://YOUR_USERNAME.pythonanywhere.com/api/`
- Hostels: `https://YOUR_USERNAME.pythonanywhere.com/api/hostels`

### 11. Update Frontend
In GitHub Actions or manually set:
```
NEXT_PUBLIC_API_URL=https://YOUR_USERNAME.pythonanywhere.com
```

---

## Troubleshooting

**502 Bad Gateway error:**
- Check **Error log** in PythonAnywhere Web tab
- Make sure virtualenv path is correct
- Click Reload again

**Import errors:**
- Make sure all requirements installed in virtual environment
- Check Python version matches

**CORS errors:**
- Make sure `CORS_ALLOWED_ORIGINS` includes your GitHub Pages URL

## Need Help?
- PythonAnywhere docs: https://help.pythonanywhere.com
- Contact PythonAnywhere support (they're very helpful!)
