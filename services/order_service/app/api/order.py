from fastapi import APIRouter
from app.schemas.order import OrderRequest
from app.core.dependencies import get_current_user
from app.services.order import OrderService
from sqlalchemy.orm import Session
from fastapi import Depends
from app.db.database import get_db

router = APIRouter(
    prefix="/api/v1/order",
    tags=["order"]
)

@router.post("/create-order")
def create_order(order: OrderRequest,current_user=Depends(get_current_user),db: Session = Depends(get_db)):
    order = OrderService.create_order(
        db,
        user_id = current_user["user_id"],
        quantity_litres = order.quantity_litres,
        delivary_date = order.delivary_date
    )

    return  {
        "message ":" Order Created",
        "order_id":order.id
    }