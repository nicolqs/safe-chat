import profanity_check

PROFANITY_THRESHOLD = 0.75


async def is_profanity_message(message: str):
    prob: float = profanity_check.predict_prob([message])
    if prob > PROFANITY_THRESHOLD:
        return True
    return False
