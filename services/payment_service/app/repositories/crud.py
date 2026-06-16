from sqlalchemy.orm import Session
from app.models.payment import Payment

class PaymentRepository:
    @staticmethod
    def create(payment: Payment, db:Session):
        db.add(payment)
        db.commit()
        db.refresh(payment)
        return payment
