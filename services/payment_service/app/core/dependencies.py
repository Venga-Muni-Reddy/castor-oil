from jose import jwt
from jose import JWTError

from fastapi import Depends
from fastapi import HTTPException

from fastapi.security import OAuth2PasswordBearer

from app.core.config import settings

from sqlalchemy.orm import Session

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="token"
)

def get_current_user(
        token: str = Depends(oauth2_scheme)
):

    try:

        payload = jwt.decode(
            token,
            settings.JWT_SECRET_KEY,
            algorithms=[settings.JWT_ALGORITHM]
        )
        print("Payload : ",payload)
        return {
            "user_id": payload["id"],
            "email": payload.get("email"),
            "role": payload.get("role")
        }

    except JWTError:

        raise HTTPException(
            status_code=401,
            detail="Invalid Token"
        )
    