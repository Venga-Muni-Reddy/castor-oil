from sqlalchemy.orm import Session
from datetime import date
from app.repositories.crud import OrderRepository
from app.models.order import Order

class OrderService:

    @staticmethod
    def create_order(
        db: Session,
        user_id: str,
        quantity_litres: float,
        delivary_date: date
    ):
        order =  Order(
            user_id=user_id,
            quantity_litres=quantity_litres,
            delivary_date=delivary_date
        )

        return OrderRepository.create_order(
            db,
            order
        )



