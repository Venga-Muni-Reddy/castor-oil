from fastapi_mail import FastMail
from fastapi_mail import MessageSchema
from fastapi_mail import ConnectionConfig

from app.core.config import settings

conf = ConnectionConfig(

    MAIL_USERNAME=settings.MAIL_USERNAME,

    MAIL_PASSWORD=settings.MAIL_PASSWORD,

    MAIL_FROM=settings.MAIL_FROM,

    MAIL_PORT=settings.MAIL_PORT,

    MAIL_SERVER=settings.MAIL_SERVER,

    MAIL_FROM_NAME=settings.MAIL_FROM_NAME,

    MAIL_STARTTLS=True,

    MAIL_SSL_TLS=False,

    USE_CREDENTIALS=True
)

async def send_email(
        to_email,
        subject,
        body
):

    message = MessageSchema(

        subject=subject,

        recipients=[to_email],

        body=body,

        subtype="html"
    )

    fm = FastMail(conf)

    await fm.send_message(message)