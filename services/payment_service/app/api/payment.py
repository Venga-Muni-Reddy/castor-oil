from fastapi import Request
from fastapi import APIRouter, Depends
from app.schemas.payment import CheckoutRequest
from app.core.dependencies import get_current_user
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.services.stripe import create_checkout_session
from app.models.payment  import Payment
from app.repositories.crud import PaymentRepository
import stripe
from app.core.config import settings
import requests
from app.utils.model_helpers import PaymentStatus

router = APIRouter(
    prefix="/api/v1/payment",
    tags=["payment"]
)

@router.post("/checkout")
def create_checkout(
        request: CheckoutRequest,
        current_user=Depends(get_current_user),
        db: Session = Depends(get_db)
):

    session = create_checkout_session(
        request.order_id,
        request.amount
    )

    payment = Payment(
        order_id=request.order_id,
        user_id=current_user["user_id"],
        stripe_session_id=session.id,
        amount=request.amount,
        payment_status="PENDING"
    )

    PaymentRepository.create(
        payment,
        db
    )

    return {
        "checkout_url": session.url
    }

@router.post("/webhook")
async def stripe_webhook(
    request: Request,
    db:Session=Depends(get_db)
):
    payload = await request.body()
    sig_header = request.headers.get(
        "stripe-signature"
    )
    event = stripe.Webhook.construct_event(
        payload,
        sig_header,
        settings.STRIPE_WEBHOOK_SECRET
    )
    print("EVENT:", event["type"])
    if event["type"] == "checkout.session.completed":
        session = event["data"]["object"]
        order_id = session["metadata"]["order_id"]
        stripe_session_id = session["id"]
        payment = (
        db.query(Payment)
            .filter(
                Payment.stripe_session_id
                == stripe_session_id
            )
            .first()
        )
        payment.payment_status = PaymentStatus.SUCCEEDED
        db.commit()
        db.refresh(payment)
        requests.patch(

            f"http://localhost:8001/api/v1/order/internal/orders/{order_id}/paid",

            json={
                "status":"paid",
                "amount": payment.amount
            }
        )
        requests.post(

            "http://localhost:8003/api/v1/notification/send-email",

            json={
                "to_email":"usaribala@gmail.com",
                "subject":"Payment Successful",
                "body":"Your order has been confirmed."
            }
        )