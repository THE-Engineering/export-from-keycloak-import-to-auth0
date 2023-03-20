FROM node:18.15-alpine
RUN apk add --no-cache bash
ENV NODE_ENV=production
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --quiet
COPY . .
