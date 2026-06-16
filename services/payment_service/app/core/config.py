from pydantic_settings import BaseSettings

class Settings(BaseSettings):

    APP_NAME:str = "Payment Service"
    APP_VERSION:str = "0.1.0"
    HOST:str = "127.0.0.1"
    PORT:int = 8002

    JWT_SECRET_KET:str = "your_secret_key"
    JWT_ALGORITHM:str = "HS256"

    DATABASE_URL: str = "postgresql://postgres:Rgukt%40123@localhost:5432/castoroilpaymentdb"

    JWT_SECRET_KEY: str = "your-secret-key"
    JWT_ALGORITHM: str = "HS256"

    STRIPE_SECRET_KEY: str 
    SUCCESS_URL: str = "http://localhost:5173/payment-success"
    CANCEL_URL: str = "http://localhost:5173/payment-cancel"

    STRIPE_WEBHOOK_SECRET: str 
    class Config:
        env_file:str = ".env"
        emv_file_encoding:str = "utf-8"

settings=Settings()


