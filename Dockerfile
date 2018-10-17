FROM node:10

RUN mkdir -p /home/node/app/srcServer
ADD ./sessionsData.json /home/node/app
ADD ./package.json /home/node/app
ADD ./package-lock.json /home/node/app
ADD ./srcServer /home/node/app/srcServer

ADD ./build /home/node/app/build
ADD ./start_app.sh /

RUN set -ex && \
  cd /home/node/app && \
  chown node:node /start_app.sh && \
  npm install --production

USER node

CMD ["/start_app.sh"]
