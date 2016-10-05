FROM alpine:3.4

RUN apk add --update nodejs && \
apk add --update inotify-tools

ENV APP_ENVIRONMENT dev
ENV HTTP_PORT 3000
EXPOSE 3000

CMD ["sh", "-c", "source /home/init dev"]
