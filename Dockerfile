FROM node:lts

RUN mkdir -p /home/node/app && chown node:node /home/node/app

WORKDIR /home/node/app

RUN mkdir -p /home/node/app/node_modules && chown node:node /home/node/app/node_modules

USER node

COPY --chown=node:node package.json package-lock.json ./

RUN npm ci --quiet

COPY --chown=node:node . .

RUN mkdir -p /home/node/app/.angular && chown node:node /home/node/app/.angular

EXPOSE 4200

CMD ["npm", "start"]
