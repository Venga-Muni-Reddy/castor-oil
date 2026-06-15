from fastapi import APIRouter
from sqlalchemy import text
from sqlalchemy.orm import Session
from fastapi import Depends

from app.db.database import get_db

router = APIRouter()

@router.get("/health/db")
def check_db(
        db: Session = Depends(get_db)
):
    db.execute(text("SELECT 1"))
    return {
        "database": "connected"
    }