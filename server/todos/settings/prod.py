from decouple import config
from .common import *

DEBUG = config('DEBUG', default=False, cast=bool)
SECRET_KEY = config('SECRET_KEY')

ALLOWED_HOSTS = [
    "mytodolist.appventuregmbh.com",
    "127.0.0.1",
    "localhost"
]
