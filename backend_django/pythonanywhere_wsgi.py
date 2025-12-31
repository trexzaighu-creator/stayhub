"""
WSGI config for PythonAnywhere deployment.

This file is used by PythonAnywhere to run the Django app.
"""

import os
import sys
from pathlib import Path

# Get the username from the path dynamically
username = Path.home().name

# Add the project directory to the path
project_path = f'/home/{username}/stayhub/backend_django'
if project_path not in sys.path:
    sys.path.insert(0, project_path)

# Set Django settings module
os.environ['DJANGO_SETTINGS_MODULE'] = 'backend_django.settings'

# Configure Django
import django
from django.conf import settings
from django.contrib.staticfiles.handlers import StaticFilesHandler

django.setup()

from django.core.wsgi import get_wsgi_application

# Use StaticFilesHandler to serve static files
application = StaticFilesHandler(get_wsgi_application())
