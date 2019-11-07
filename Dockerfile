FROM node:10
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY ["package.json", "yarn.lock", "./"]
COPY ["mock-api/package.json", "mock-api/yarn.lock", "./mock-api/"]
RUN yarn docker-build-install
RUN ls
COPY . .
RUN yarn docker-build
EXPOSE 5000
WORKDIR /usr/src/app/mock-api
RUN mkdir data 
RUN chmod -R 0777 data
USER node
CMD ["node", "dist/server.js"]