import os
from pathlib import Path
from datetime import timedelta
import dotenv


BASE_DIR = Path(__file__).resolve().parent.parent
ENV_PATH = BASE_DIR / '.env'
dotenv.read_dotenv(str(ENV_PATH))


SECRET_KEY = os.environ.get("DJANGO_SECRET_KEY")


DEBUG = bool(int(os.environ.get("DEBUG")))

if bool(int(os.environ.get("DEBUG")))==False:
    ALLOWED_HOSTS = []
    ALLOWED_HOST = os.environ.get("ALLOWED_HOST")
    if ALLOWED_HOST:
        ALLOWED_HOSTS.append(ALLOWED_HOST.strip())
else: 
    ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # third party api services
    'algoliasearch_django',

    # third party
    'rest_framework',
    'rest_framework_simplejwt',
    'rest_framework_simplejwt.token_blacklist',
    # 'social_django',

    'djoser',
    'corsheaders',

    # app
    'account',
    'course',
    'quiz',
    'order',
]


MIDDLEWARE = [
    # 'social_django.middleware.SocialAuthExceptionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'core.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [ BASE_DIR / 'account/template', 'course/template', 'build'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'social_django.context_processors.backends',
                'social_django.context_processors.login_redirect'
            ],
        },
    },
]

WSGI_APPLICATION = 'core.wsgi.application'

DJANGO_SUPERUSER_USERNAME=os.environ.get("DJANGO_SUPERUSER_USERNAME")
DJANGO_SUPERUSER_PASSWORD=os.environ.get("DJANGO_SUPERUSER_PASSWORD")
DJANGO_SUPERUSER_EMAIL=os.environ.get("DJANGO_SUPERUSER_EMAIL")

# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases

DB_DATABASE = os.environ.get("POSTGRES_DB")
DB_USER = os.environ.get("POSTGRES_USER")
DB_PASSWORD = os.environ.get("POSTGRES_PASSWORD")
DB_HOST =os.environ.get("POSTGRES_HOST")
DB_PORT = os.environ.get("POSTGRES_PORT")

DB_IS_AVAIL = all([
    DB_DATABASE,
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT
])

POSTGRES_READY=bool(int(os.environ.get('POSTGRES_READY')))


if DB_IS_AVAIL and POSTGRES_READY:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME' : DB_DATABASE,
            'USER' : DB_USER,
            'PASSWORD' : DB_PASSWORD,
            'HOST' : DB_HOST,
            'PORT' : DB_PORT,
        }
    }
# else:
# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': BASE_DIR / 'db.sqlite3',
#     }
# }



# Password validation
# https://docs.djangoproject.com/en/4.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True



# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.1/howto/static-files/


REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
        "rest_framework.authentication.SessionAuthentication",
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        "rest_framework.permissions.AllowAny",
    ),
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10
}


AUTHENTICATION_BACKENDS = (
    'django.contrib.auth.backends.ModelBackend',
)


# AWS BUCKET CONFIG
if bool(int(os.environ.get("DEBUG")))==False:
    AWS_DEFAULT_ACL=None
    AWS_STORAGE_BUCKET_NAME = os.environ.get("AWS_STORAGE_BUCKET_NAME")
    AWS_S3_USE_SSL=True
    AWS_S3_VERITY=True
    AWS_S3_REGION_NAME="eu-west-2"
    AWS_ACCESS_KEY_ID=os.environ.get("AWS_ACCESS_KEY_ID")
    AWS_S3_SECRET_ACCESS_KEY=os.environ.get("AWS_S3_SECRET_ACCESS_KEY")
    AWS_S3_CUSTOM_DOMAIN = "learnit.s3.eu-west-2.amazonaws.com"
    # file upload storage
    DEFAULT_FILE_STORAGE = 'core.storages.MediaStorage'
    # staticfiles
    STATICFILES_STORAGE = 'core.storages.StaticFileStorage'

    STATIC_URL = 'https://learnit.s3.eu-west-2.amazonaws.com/'
    MEDIA_URL = 'https://learnit.s3.eu-west-2.amazonaws.com/'
    STATICFILES_DIRS = [
        BASE_DIR / "build/static"
    ]
    STATIC_ROOT = "static/"
    MEDIA_ROOT = "media/"

else: 
    STATIC_URL = 'static/'
    MEDIA_URL = "media/"
    STATICFILES_DIRS = [
        BASE_DIR / "build" / "static"
    ]
    STATIC_ROOT = BASE_DIR.parent / "local-cdn" / "static"
    MEDIA_ROOT = BASE_DIR.parent / "local-cdn" / "media"

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


DJOSER = {
    "LOGIN_FIELD": "email",
    "USER_CREATE_PASSWORD_RETYPE": True,
    "SET_PASSWORD_RETYPE": True,
    "PASSWORD_RESET_CONFIRM_RETYPE": True,
    "PASSWORD_CHANGED_EMAIL_CONFIRMATION": False,
    "USERNAME_CHANGED_EMAIL_CONFIRMATION": True,
    'PASSWORD_RESET_CONFIRM_URL': 'password/reset/{uid}/{token}',
    'USERNAME_RESET_CONFIRM_URL': 'email/reset/confirm/{uid}/{token}',
    'SERIALIZERS': {
        "user_create": "account.serializers.UserCreateSerializer",
        "user": "account.serializers.UserSerializer",
        'current_user': "account.serializers.UserCreateSerializer",
        "user_delete": "account.serializers.UserSerializer",
    },
    # 'EMAIL':{
    #     "activation": "account.email.ActivationEmail",
    #     "confirmation": "djoser.email.ConfirmationEmail",
    #     "password_reset": "djoser.email.PasswordResetEmail",
    #     "password_changed_confirmation": "djoser.email.PasswordChangedConfirmationEmail",
    # }
}

AUTH_USER_MODEL = "account.UserAccount"

SIMPLE_JWT = {
    'AUTH_HEADER_TYPES': ('JWT',),
    "ACCESS_TOKEN_LIFETIME": timedelta(hours=7),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),
}


CORS_ALLOW_ALL_ORIGINS=True

'''
    Algolia configuration
'''
ALGOLIA = {
    'APPLICATION_ID': os.environ.get("ALGOLIA_APPLICATION_ID"),
    'API_KEY': os.environ.get("ALGOLIA_API_KEY"),
    'INDEX_PREFIX': os.environ.get("ALGOLIA_INDEX_PREFIX")
}

'''
    Stripe Configuration
'''
STRIPE_SECRET_KEY=os.environ.get("STRIPE_SECRET_KEY")
STRIPE_PUBLIC_KEY=os.environ.get("STRIPE_PUBLIC_KEY")
STRIPE_WEBHOOK_SECRET_KEY=os.environ.get("STRIPE_WEBHOOK_SECRET_KEY")


SITE_URL = 'https://learnwithus.ltlopcocigrbu.eu-west-2.cs.amazonlightsail.com/payment/'


'''
    Email configuration

'''
# AWS_ACCESS_KEY_ID = "AKIARYREEJ22I5VEPAXY"
# AWS_SECRET_ACCESS_KEY="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"

# EMAIL_BACKEND = 'django_ses.SESBackend'
# AWS_SES_REGION_NAME = 'us-east-1'
# AWS_SES_REGION_EMDPOINT = 'email.us-east-1.amazonaws.com'
if bool(int(os.environ.get("DEBUG")))==True:
    PROTOCOL = "http"
    DOMAIN = "localhost:3000"
else:
    PROTOCOL = "https"
    DOMAIN = "learnwithus.ltlopcocigrbu.eu-west-2.cs.amazonlightsail.com"

SITE_NAME = "LearnIt"
FROM_EMAIL = os.environ.get("EMAIL_HOST_USER")

EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_HOST_USER = os.environ.get("EMAIL_HOST_USER")
EMAIL_HOST_PASSWORD = os.environ.get("EMAIL_HOST_PASSWORD")
EMAIL_PORT = 587
EMAIL_USE_TLS = True


SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')