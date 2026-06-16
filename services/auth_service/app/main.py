from fastapi import FastAPI
import uvicorn
from app.core.config import settings
from app.api.health import router as health_router
from app.api.auth import router as auth_router
from app.exceptions.auth import BaseApiException, api_exception_handler

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title=settings.APP_NAME, version=settings.APP_VERSION)

# Enable CORS for the React frontend client
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173","http://localhost:5174", "http://127.0.0.1:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_exception_handler(BaseApiException, api_exception_handler)
app.include_router(health_router,tags=["Health Check"])
app.include_router(auth_router)

@app.get("/")
def read_root():
    """Root endpoint."""
    return {"message": "Welcome to the Auth Service!"}

if __name__ == "__main__":
    uvicorn.run("app.main:app", host=settings.HOST, port=settings.PORT, reload=True)
