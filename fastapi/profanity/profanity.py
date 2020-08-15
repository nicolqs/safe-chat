import profanity_check


async def is_profanity_message(message: str):
    prob: float = profanity_check.predict_prob([message])
    if prob > 0.75:
        return True
    return False
