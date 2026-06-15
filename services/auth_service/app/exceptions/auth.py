from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder

app = FastAPI()

class BaseApiException(Exception):
    def __init__(self, message:str, status_code:int):
        self.message = message
        self.status_code = status_code


class UserAlreadyExistsException(BaseApiException):
    def __init__(self,message="User already exists with provided details"):
        super().__init__(message = message, status_code = 400)

class InvalidCredentialsException(BaseApiException):
    def __init__(self,message="Invalid Credential"):
        super().__init__(message=message, status_code = 401)

class UnAuthorizedException(BaseApiException):
    def __init__(self, message="Unauthorized"):
        super().__init__(message=message, status_code = 401)
    
@app.exception_handler(BaseApiException)
async def api_exception_handler(req: Request, exc: BaseApiException):
    return JSONResponse(
        status_code = exc.status_code,
        content = {
            "success": False,
            "message": exc.message
        }
    )

def success_response(data: any = None, message: str = "Success", status_code: int = 200):
    # Wrap the dictionary with jsonable_encoder so database models convert cleanly!
    return JSONResponse(
        status_code=status_code,
        content=jsonable_encoder({
            "success": True,
            "message": message,
            "data": data or {}
        })
    )

