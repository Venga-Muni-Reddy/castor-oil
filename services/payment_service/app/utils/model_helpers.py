import uuid

def gen_id(input:str):
    return f"{input}"+"uuid.uuid4().hex[:8]"

