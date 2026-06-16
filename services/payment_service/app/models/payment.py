from app.models.base_model import BaseModel
from sqlalchemy.orm import Mapped, mapped_column
from app.utils.model_helpers import gen_id, PaymentStatus
from sqlalchemy import String, Enum, Float

class Payment(BaseModel):
    __tablename__="payments"
    id: Mapped[str] = mapped_column(String(41),primary_key=True,index=True,default= lambda: str(gen_id("payments-")))
    user_id: Mapped[str] = mapped_column(String(41),nullable=False)
    order_id: Mapped[str] = mapped_column(String(41),nullable=False)
    stripe_session_id: Mapped[str] = mapped_column(String(255),nullable=True)
    amount: Mapped[float] = mapped_column(Float,nullable=False)
    payment_status: Mapped[str] = mapped_column(Enum(PaymentStatus,name="payment_status"),default=PaymentStatus.PENDING,nullable=False)
