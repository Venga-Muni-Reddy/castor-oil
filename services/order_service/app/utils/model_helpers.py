import uuid
import enum
from sqlalchemy import Enum

class OrderStatus(enum.Enum):
    PENDING = "pending"
    PAID = "paid"
    PROCESSING = "processing"
    DELIVERED = "delivered"

def gen_id(input:str) -> str:
    return f"{input}-{uuid.uuid4().hex[:8]}"