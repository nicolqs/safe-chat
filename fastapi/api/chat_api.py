from profanity import profanity

from dal import chat_dal
import rabbitmq.client 


async def save_chat_message(chat_message):
    is_saved = await chat_dal.insert_chat(chat_message)
    return is_saved


async def send_chat(chat_message):
    is_saved = await save_chat_message(chat_message)
    is_profanity, msg_dict = await is_profanity_message(chat_message)

    if not is_profanity:
        # send to queue
        await rabbitmq.client.send_chat(chat_message.message)

    return is_profanity, msg_dict


async def is_profanity_message(chat_message):
    is_profanity = await profanity.is_profanity_message(chat_message.message)
    if not is_profanity:
        msg_dict = chat_message.dict()
        return is_profanity, msg_dict

    return is_profanity, None
