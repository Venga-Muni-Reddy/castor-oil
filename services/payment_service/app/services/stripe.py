import stripe
from app.core.config import settings

stripe.api_key = settings.STRIPE_SECRET_KEY

def create_checkout_session(
        order_id,
        amount
):

    session = stripe.checkout.Session.create(

        payment_method_types=["card"],

        line_items=[

            {
                "price_data": {
                    "currency": "inr",
                    "product_data": {
                        "name": f"{order_id}"
                    },
                    "unit_amount": int(
                        amount * 100
                    )
                },
                "quantity": 1
            }
        ],

        mode="payment",

        success_url=settings.SUCCESS_URL,

        cancel_url=settings.CANCEL_URL,

        metadata={
            "order_id": order_id
        }
    )

    return session