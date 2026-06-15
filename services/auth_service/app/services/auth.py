from sqlalchemy.orm import Session
from app.repositories.crud import UserRepository
from app.models.user import User
from app.utils.security import verify_pwd, hash_pwd, create_access_token, create_refresh_token
from app.exceptions.auth import UserAlreadyExistsException

class AuthService:

    @staticmethod
    def signup(db: Session,name: str, email:str, password:str):

        #Check user already exists with this email or not
        existing_user = UserRepository.get_user_by_email_or_id(db, email=email)
        if existing_user:
            raise UserAlreadyExistsException
        password = hash_pwd(password)
        user = User(name=name,email=email,password=password)
        # Create a user object and save it to the database
        created_user = UserRepository.create_user(db, user)
        return created_user
    
    @staticmethod
    def signin(db: Session, email:str, password:str):
        # Check if the user exists with provided email
        user = UserRepository.get_user_by_email_or_id(db, email=email)
        if not user:
            raise ValueError("Invalid email or password.")
        # Verify the provided password with the stored hashed password
        if not verify_pwd(password, user.password):
            raise ValueError("Invalid email or password.")
        access_token = create_access_token({"id": str(user.id), "email": user.email, "role": user.role.value})
        refresh_token = create_refresh_token({"id": str(user.id)})
        return {
            "user": user,
            "access_token": access_token,
            "refresh_token": refresh_token
        }
