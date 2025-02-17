"""
Django settings for idp project.

Generated by 'django-admin startproject' using Django 4.2.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.2/ref/settings/
"""

from pathlib import Path


# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "django-insecure-vri27@j_q62e2it4$xiy9ca!7@qgjkhhan(*zs&lz0k@yukbb3"

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "oauth2_provider",
    "corsheaders",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "idp.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "templates"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "idp.wsgi.application"


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}


# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = "static/"

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

OAUTH2_PROVIDER = {
    "OIDC_ENABLED": True,
    "OIDC_RP_INITIATED_LOGOUT_ENABLED": True,
    # this key is just for out test app, you should never store a key like this in a production environment.
    "OIDC_RSA_PRIVATE_KEY": """
-----BEGIN RSA PRIVATE KEY-----
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
-----END RSA PRIVATE KEY-----
""",
    "SCOPES": {
        "openid": "OpenID Connect scope",
    },
}

# just for this example
CORS_ORIGIN_ALLOW_ALL = True

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "handlers": {
        "console": {
            "class": "logging.StreamHandler",
        },
    },
    "root": {
        "handlers": ["console"],
        "level": "WARNING",
    },
    "loggers": {
        # log oauth2_provider issues to facilitate troubleshooting
        "oauth2_provider": {
            "handlers": ["console"],
            "level": "DEBUG",
            "propagate": False,
        },
    },
}
