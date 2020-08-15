from dal import user_dal


async def all_users():
    users = await dal.user_dal.all_users()
    return jsonable_encoder(users)
