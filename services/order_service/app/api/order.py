from fastapi import APIRouter
from app.schemas.order import OrderRequest, UpdateOrderStatus
from app.core.dependencies import get_current_user
from app.services.order import OrderService, OrderAuthorizationService
from sqlalchemy.orm import Session
from fastapi import Depends
from app.db.database import get_db
from app.core.dependencies import owner_required
from fastapi import HTTPException

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

@router.get("/my-orders")
def get_orders_by_user(db:Session=Depends(get_db), current_user=Depends(get_current_user)):
    orders = OrderService.get_myorders(db,current_user["user_id"])
    return{
        "message":"Orders fetched successfully",
        "orders":orders
    }

@router.get("/all-orders")
def get_all_orders(db:Session=Depends(get_db),current_user=Depends(owner_required)):
    all_orders = OrderService.get_all_orders(db)
    return {
        "message": "All orders fetched successfully",
        "all_orders": all_orders
    }   

@router.get("/{user_id}")
def get_orders_for_specific_user(user_id:str,db:Session=Depends(get_db)):
    orders = OrderService.get_myorders(db,user_id)
    return{
        "message":"Orders for specific user fetched",
        "orders":orders
    }   

@router.patch("/{order_id}")
def update_status(order_id:str,req:UpdateOrderStatus,db:Session=Depends(get_db),current_user=Depends(owner_required)):
        order = OrderService.update_order(order_id,req.status,db)
        return {
            "message":"Order Updated successfully",
            "updated_order":order
        }

@router.get("/get-order/{order_id}")
def get_order(order_id:str,db:Session=Depends(get_db),current_user=Depends(get_current_user)):
     order = OrderService.get_order_by_id(order_id,db)
     if not order:
          raise HTTPException(
               status_code=404,
               detail="order not found"
          )
     
     OrderAuthorizationService.verify_access(current_user,order)
     return order

@router.delete("/{order_id}")
def delete_order(order_id:str,db:Session=Depends(get_db),current_user = Depends(owner_required)):
    order = OrderService.delete_order(order_id,db)  
    return{
         "message":"Specific order with id = {order_id} deleted successfully",
         "order": order
    }

    
     
