from app.models.base_model import BaseModel
from sqlalchemy.orm import Mapped, mapped_column
from app.utils.model_helpers import gen_id, OrderStatus
from sqlalchemy import String, Enum
from datetime import datetime

class Order(BaseModel):
    __tablename__ = "orders"
    id: Mapped[str] = mapped_column(String(41),primary_key=True,index=True,default= lambda: str(gen_id("orders-")))
    user_id: Mapped[str] = mapped_column(String(41),nullable=False)
    quantity_litres: Mapped[float] = mapped_column()
    delivary_date: Mapped[datetime] = mapped_column()
    order_status: Mapped[str] = mapped_column(Enum(OrderStatus,name="order_status"), nullable=False, default=OrderStatus.PENDING)