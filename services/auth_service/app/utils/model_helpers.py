import enum
from sqlalchemy import Enum, ForeignKey
import uuid

def gen_id(prefix:str) -> str:
    return f"{prefix}-{uuid.uuid4().hex[:8]}"

class UserRole(enum.Enum):
    OWNER = "owner"
    USER = "user"

class OrderStatus(enum.Enum):
    PENDING = "pending"
    PAID = "paid"
    PROCESSING = "processing"
    DELIVERED = "delivered"

class PaymentStatus(enum.Enum):
    PENDING = "pending"
    SUCCEEDED = "succeeded"
    FAILED = "failed"
    CANCELLED = "cancelled"