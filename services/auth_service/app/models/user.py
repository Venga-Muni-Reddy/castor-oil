from app.models.base_model import BaseModel
from sqlalchemy.orm import Mapped, mapped_column
from app.utils.model_helpers import gen_id, UserRole
from sqlalchemy import Enum, String


class User(BaseModel):
    __tablename__ = "users"

    id: Mapped[str] = mapped_column(String(41), primary_key=True, index=True, default=lambda: gen_id("user"))
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    email: Mapped[str] = mapped_column(String(255), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String(255), nullable=False)
    role: Mapped[UserRole] = mapped_column(Enum(UserRole, name="user_role"), default=UserRole.USER, nullable=False)

