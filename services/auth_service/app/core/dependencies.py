from fastapi import HTTPException, Depends
from jose import jwt
from app.core.config import settings
from app.repositories.crud import UserRepository
from app.db.database import get_db
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from app.models.user import User

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="apii/v1/auth/login")

credentials_exception = HTTPException(
    status_code=401,
    detail="Invalid token"
)

def get_current_user(token: str = Depends(oauth2_scheme),db:Session= Depends(get_db)):
    
    try:
        payload = jwt.decode(token,settings.JWT_SECRET_KEY,algorithms=[settings.JWT_ALGORITHM])
        print("Payload : ",payload)
        user_id =  payload.get("id")

        if user_id is None:
            raise credentials_exception
    except:
        raise credentials_exception

    user = UserRepository.get_user_by_email_or_id(db,id=user_id)
    if not user:
        raise credential_exception
    return user    

def owner_required(
        current_user: User = Depends(
            get_current_user
        )
):
    if current_user.role != "OWNER":
        raise HTTPException(
            status_code=403,
            detail="Access denied"
        )
    return current_user