from profanity import profanity

import dal.chat_dal
import rabbitmq.client


async def save_chat_message(chat_message):
    await dal.chat_dal.insert_chat(chat_message)


async def send_chat(chat_message):
    await save_chat_message(chat_message)
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


async def all_chats():
    chats = await dal.chat_dal.all_chats()
    return chats
