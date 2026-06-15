from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    """Configuration settings for the Orders Microservice."""

    # 📦 Application (Unique to Orders)
    APP_NAME: str = "Orders Service"
    APP_VERSION: str = "0.1.0"
    HOST: str = "127.0.0.1"
    PORT: int = 8001  # 💡 Notice the port change to avoid local conflicts!

    # 🔑 JWT Security (Shared with Auth Service to decode tokens)
    JWT_SECRET_KEY: str = "your-secret-key"  # Must match Auth Service exactly
    JWT_ALGORITHM: str = "HS256"

    # 🗄️ Database (Unique to Orders)
    DATABASE_URL: str = "postgresql://postgres:Rgukt%40123@localhost:5432/castoroilorderdb"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

settings = Settings()