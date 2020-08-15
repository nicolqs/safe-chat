#!/bin/sh

# Create Rabbitmq user
( sleep 20 ; \
rabbitmqctl add_user docker docker ; \
rabbitmqctl set_user_tags docker administrator ; \
rabbitmqctl set_permissions -p / docker  ".*" ".*" ".*" ; \
echo "*** User 'docker' with password 'docker' completed. ***" ; \
echo "*** Log in the WebUI at port 15672 (example: http:/localhost:15672) ***") &
rabbitmqctl change_password guest guest
# $@ is used to pass arguments to the rabbitmq-server command.
# For example if you use it like this: docker run -d rabbitmq arg1 arg2,
# it will be as you run in the container rabbitmq-server arg1 arg2
rabbitmq-server $@