from app.models.base_model import BaseModel
from sqlalchemy.orm import Mapped, mapped_column
from app.utils.model_helpers import gen_id
from sqlalchemy import String

class Payment(BaseModel):
    __tablename__="payments"
    id: Mapped[str] = mapped_column(String(41),primary_key=True,index=True,default= lambda: str(gen_id("payments-")))
    