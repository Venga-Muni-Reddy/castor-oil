from fastapi import FastAPI
import uvicorn 
from app.api.order import router as order_route

app = FastAPI(
    title="Order Service",
    version="1.0.0"
)

app.include_router(order_route)

@app.get("/")
def hello_world():
    return "Hello World!!!!!!!!!"

if __name__ == "__main__":
    uvicorn.run("app.main:app",host="127.0.0.1",port=8001,reload=True)
