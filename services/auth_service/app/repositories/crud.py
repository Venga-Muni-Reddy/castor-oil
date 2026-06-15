from sqlalchemy.orm import Session
from typing import Optional
from app.models.user import User

class UserRepository:

    @staticmethod
    def get_user_by_email_or_id(db:Session, email:Optional[str]=None, id:Optional[str]=None):
        """Fetch a user by email or ID."""
        if email:
            return db.query(User).filter(User.email == email).first()
        elif id:
            return db.query(User).filter(User.id == id).first()
        return None
    
    @staticmethod
    def create_user(db:Session, user:User):
        """Create a new user."""
        db.add(user)
        db.commit()
        db.refresh(user)
        return user
    
    
    
