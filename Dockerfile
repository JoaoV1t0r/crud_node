FROM node:16
WORKDIR /usr/app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
EXPOSE 3000
CMD yarn start
# COPY . .
# CMD ["yarn", "start"]