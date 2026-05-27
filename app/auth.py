from datetime import datetime, timedelta, timezone
from jose import JWSError, jwt
from passlib.context import CryptContext
from fastapi import Request, HTTPException, status
from dotenv import load_dotenv
import os

load_dotenv()