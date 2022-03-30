FROM node:16
WORKDIR /usr/app
COPY package.json ./
RUN yarn install
COPY . .
CMD yarn start
EXPOSE 3000
# COPY . .
# CMD ["yarn", "start"]