from sqlalchemy.orm import Session
from datetime import date
from app.repositories.crud import OrderRepository
from app.models.order import Order
from sqlalchemy.orm import Session
from fastapi import HTTPException

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

    @staticmethod
    def get_myorders(db:Session, user_id:str):
        return OrderRepository.get_orders_by_user(db,user_id)
    
    @staticmethod
    def get_all_orders(db:Session):
        return OrderRepository.get_all_orders(db)
    
    @staticmethod
    def update_order(order_id:str,status:str,db:Session):
        order = OrderRepository.get_order_by_id(order_id,db)
        order.order_status=status
        updated_order = OrderRepository.update_order(order,db)
        return updated_order
    
    @staticmethod
    def get_order_by_id(order_id,db:Session):
        return OrderRepository.get_order_by_id(order_id,db)
    
    @staticmethod
    def delete_order(order_id,db:Session):
        order = OrderRepository.get_order_by_id(order_id,db)
        if not order:
            raise HTTPException(
                status_code=404,
                detail="Order not found"
            )
        order.status=0
        updated_order = OrderRepository.update_order(order,db)
        return updated_order

class OrderAuthorizationService:

    @staticmethod
    def verify_access(current_user,order:Order):
        if(current_user["role"] == 'owner'):
            return

        if(current_user["user_id"] != order.user_id):
            raise HTTPException(
                status_code=403,
                detail="You are not allowed to access this order"
            )

