FROM node:20

WORKDIR /home/node/app

COPY --chown=node:node package*.json ./

RUN npm ci --quiet

USER node

EXPOSE 4200

CMD ["npm", "start"]