from app.models.order import Order
from sqlalchemy.orm import Session
from app.core.dependencies import ( owner_required )
from fastapi import Depends

class OrderRepository:

    @staticmethod
    def create_order(
        db: Session,
        order: Order
    ):
        db.add(order)
        db.commit()
        db.refresh(order)
        return order
    
    @staticmethod
    def get_orders_by_user(
        db: Session,
        user_id: str
    ):
        orders = db.query(Order).filter(Order.user_id == user_id).all()
        return orders

    @staticmethod
    def get_all_orders(
        db: Session
    ):
        return db.query(Order).all()
    
    @staticmethod
    def get_order_by_id(order_id:str,db:Session):
        return db.query(Order).filter(Order.id==order_id).first()
    
    @staticmethod
    def update_order(order:Order,db:Session):
        db.commit()
        db.refresh(order)
        return order
    
    # @staticmethod
    # def delete_order(order_id:str,db:Session):
        
        

    
