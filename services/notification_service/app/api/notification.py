from fastapi import APIRouter

from app.schemas.email import EmailRequest

from app.services.email import (
    send_email
)

router = APIRouter(
    prefix="/api/v1/notification",
    tags=["Notifications"]
)

@router.post("/send-email")
async def email(
        request: EmailRequest
):

    await send_email(
        request.to_email,
        request.subject,
        request.body
    )

    return {
        "message":"Email sent successfully"
    }