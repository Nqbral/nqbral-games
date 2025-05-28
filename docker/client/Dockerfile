FROM node:slim

WORKDIR /home

COPY ./package.json ./
COPY ./yarn.lock ./
COPY ./workspaces/client ./workspaces/client

RUN yarn install

CMD ["yarn", "start:prod:client"]