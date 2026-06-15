from datetime import date
from pydantic import BaseModel

class OrderRequest(BaseModel):
    quantity_litres: float
    delivary_date: date

class OrderResponse(BaseModel):
    id: str
    user_id: str
    quantity_litres: str
    delivary_date: date
    status: str

    class Config:
        from_attributes=True

class UpdateOrderStatus(BaseModel):
    status:str
