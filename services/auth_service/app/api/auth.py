from fastapi import APIRouter, Depends
from app.db.database import get_db
from sqlalchemy.orm import Session
from app.services.auth import AuthService
from fastapi import HTTPException
from app.repositories.crud import UserRepository
from app.utils.security import verify_pwd
from app.core.dependencies import get_current_user
from app.models.user import User
from fastapi.security import OAuth2PasswordRequestForm 
from app.exceptions.auth import success_response
from app.exceptions.auth import InvalidCredentialsException, UnAuthorizedException
from app.schemas.user import SignUp, SignIn
from app.schemas.token import RefreshToken
from app.utils.security import decode_refresh_token, create_access_token

router = APIRouter(
    prefix="/api/v1/auth",
    tags=["auth"],
)

@router.post("/signup")
def signup(user:SignUp, db: Session = Depends(get_db)):
    created_user = AuthService.signup(db, user.name, user.email, user.password)
    return success_response(
        data={"user": created_user},
        message="User created successfully",
        status_code=201
    )
    
# @router.post("/login")
# def login(email: str,password: str, db: Session = Depends(get_db)):
#     try:
#         token = AuthService.signin(db, email, password)
#         if token:
#             user = UserRepository.get_user_by_email_or_id(db,email)
#         return{
#             "user": user,
#             "token": token,
#             "token_type": "Bearer"
#         }
#     except ValueError as e:
#         raise HTTPException(
#             status_code=400,
#             detail=str(e)
#         )

@router.post("/user-info")
def fetch_user_info(current_user: User = Depends(get_current_user)):
        return current_user

@router.post("/login")
def login(
    #form_data: OAuth2PasswordRequestForm = Depends(),  # 🔑 Use form_data dependency here
    user: SignIn,
    db: Session = Depends(get_db)
):
    try:
        # Note: OAuth2PasswordRequestForm uses '.username', so we map it to your email field!
        loggedin_data = AuthService.signin(db, email=user.email, password=user.password)            
        return success_response(
            data=loggedin_data,
            message="Login Success"
        )
    except ValueError as e:
        raise InvalidCredentialsException()

@router.post("/refresh")
def refresh_token(token: RefreshToken,db: Session = Depends(get_db)):
    payload =  decode_refresh_token(token.token)
    print("Payload : ",payload)
    # if payload["type"] != "refresh":
    #     raise UnAuthorizedException()
    id = payload["id"]
    user = UserRepository.get_user_by_email_or_id(db,id=id)
    new_access_token = create_access_token({"id": str(id), "email": user.email, "role": user.role.value})
    return success_response({
        "status_code":200,
        "message": "New Access Token Generated",
        "data": {
            "token":new_access_token
        }
    })

    