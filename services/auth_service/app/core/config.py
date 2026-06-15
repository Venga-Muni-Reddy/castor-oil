from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    """Application settings."""

    # Application
    APP_NAME: str = "Auth Service"
    APP_VERSION: str = "0.1.0"
    HOST: str = "127.0.0.1"
    PORT: int = 8000

    # JWT
    JWT_SECRET_KEY: str = "your-secret-key"
    JWT_ALGORITHM: str = "HS256"
    JWT_ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    JWT_REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    # Database
    DATABASE_URL: str = "postgresql://postgres:Rgukt%40123@localhost:5432/castoroil"

    class Config:
        """Configuration for the settings."""

        env_file = ".env"
        env_file_encoding = "utf-8"

settings = Settings()