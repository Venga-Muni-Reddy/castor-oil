from pydantic import BaseModel
from pydantic import EmailStr


class EmailRequest(BaseModel):

    to_email: EmailStr

    subject: str

    body: str