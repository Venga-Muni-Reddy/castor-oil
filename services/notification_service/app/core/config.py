from pydantic_settings import BaseSettings


class Settings(BaseSettings):

    MAIL_USERNAME: str = "vengamunireddy040404@gmail.com"

    MAIL_PASSWORD: str = "sswy rbsj dubs usmi"

    MAIL_FROM: str = "vengamunireddy040404@gmail.com"

    MAIL_PORT: int = 587

    MAIL_SERVER: str = "smtp.gmail.com"

    MAIL_FROM_NAME: str = "Castor Oil Notifications"

    class Config:
        env_file = ".env"


settings = Settings()