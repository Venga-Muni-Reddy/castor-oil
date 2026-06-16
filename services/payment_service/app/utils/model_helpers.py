import uuid
import enum
from sqlalchemy import Enum

def gen_id(input:str):
    return f"{input}-{uuid.uuid4().hex[:8]}"

class PaymentStatus(enum.Enum):
    PENDING = "pending"
    SUCCEEDED = "succeeded"
    FAILED = "failed"
    CANCELLED = "cancelled"