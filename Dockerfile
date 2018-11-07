FROM node:10

RUN mkdir -p /home/node/app/srcServer
ADD ./package.json /home/node/app
ADD ./package-lock.json /home/node/app
ADD ./srcServer /home/node/app/srcServer
ADD ./build /home/node/app/build
ADD ./start_app.sh /

VOLUME ["/data"]

RUN set -ex && \
  rm /home/node/app/build/static/vapid-keys.public.json || echo ignore missing file && \
  ln -s /data/vapid-keys.private.json /home/node/app/vapid-keys.private.json && \
  ln -s /data/vapid-keys.public.json /home/node/app/build/static/vapid-keys.public.json && \
  ln -s /data/sessionsData.json /home/node/app/sessionsData.json && \
  ln -s /data/subscriptions.json /home/node/app/subscriptions.json && \
  cd /home/node/app && \
  chown node:node /start_app.sh && \
  npm install --production

USER node

CMD ["/start_app.sh"]
