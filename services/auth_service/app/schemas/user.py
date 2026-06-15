from pydantic import BaseModel, EmailStr

class SignUp(BaseModel):
    email: EmailStr
    password: str
    name: str

class SignIn(BaseModel):
    email: EmailStr
    password: str

class User_Response(BaseModel):
    id: str
    name: str
    email: EmailStr
    role: str
    class Config:
        from_attributes = True