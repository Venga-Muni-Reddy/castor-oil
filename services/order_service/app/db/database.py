from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.core.config import settings

engine = create_engine(settings.DATABASE_URL,echo=True)

session = sessionmaker(autocommit=False,autoflush=False,bind=engine)

def get_db():
    db = session()
    try:
        yield db
    except Exception as e:
        raise Exception(f"DB Connection issue: {e}")
    finally:
        db.close()
