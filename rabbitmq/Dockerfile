FROM rabbitmq:management

# Define environment variables.
ENV RABBITMQ_DEFAULT_USER docker
ENV RABBITMQ_DEFAULT_PASS docker

ADD init.sh /init.sh

RUN ["chmod", "+x", "/init.sh"]

EXPOSE 15672

# Define default command
CMD ["/init.sh"]
