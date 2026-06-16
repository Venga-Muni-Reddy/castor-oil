from fastapi import FastAPI
import uvicorn 
from app.api.order import router as order_route

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Order Service",
    version="1.0.0"
)

# Enable CORS for the React frontend client
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(order_route)

@app.get("/")
def hello_world():
    return "Hello World!!!!!!!!!"

if __name__ == "__main__":
    uvicorn.run("app.main:app",host="127.0.0.1",port=8001,reload=True)
