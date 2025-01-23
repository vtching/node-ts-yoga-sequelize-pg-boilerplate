FROM node:22-alpine

# set /api directory as default working directory
WORKDIR /api

COPY package*.json ./

RUN npm install

# copy all file from current dir to /api in container
COPY . .

# expose port 8080
EXPOSE 8080

# cmd to start service
CMD ["npm", "run", "start"]
