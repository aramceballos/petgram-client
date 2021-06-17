FROM node:14

COPY ["package.json", "yarn.lock", "/usr/src/app/"]

WORKDIR /usr/src/app

RUN yarn

COPY [".", "/usr/src/app/"]

RUN npm run build

EXPOSE 3000

CMD [ "yarn", "start" ]