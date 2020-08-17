from typing import Optional

from pydantic import BaseModel


class ChatMessage(BaseModel):
    """
    A FastAPI Model type
    """

    uid_src: int
    uid_dest: int
    message: str
    created_at: Optional[str]
    description: Optional[str] = None
