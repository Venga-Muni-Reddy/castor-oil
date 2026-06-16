from app.db.base import Base
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import Integer,DateTime
from datetime import datetime, timezone


class BaseModel(Base):
    __abstract__=True
    status: Mapped[int] = mapped_column(Integer,default=1,nullable=False)
    created_on: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=datetime.now(timezone.utc),
        nullable=False
    )