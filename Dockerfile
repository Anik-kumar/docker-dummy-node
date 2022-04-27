FROM node:16

# app directory
WORKDIR /Volumes/Mac/git/docker/dummy

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install
# if building code in production mode
## RUN npm ci --only=production

# bundle app source code inside docker image
COPY . .

# docker port 
EXPOSE 8080

# start command for app
CMD [ "node", "server.js" ]