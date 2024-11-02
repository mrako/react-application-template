FROM node:20-alpine

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Install app dependencies
COPY package*.json /app/
RUN npm ci

# Install database configurations
COPY prisma /app/prisma
RUN npx prisma generate

# Bundle app source
COPY . /app

CMD [ "npm", "start" ]
