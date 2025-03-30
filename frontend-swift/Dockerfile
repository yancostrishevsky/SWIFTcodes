# Stage 1: Build Angular App
FROM node:20 AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --prod

# Stage 2: Serve app with nginx
FROM nginx:stable-alpine

COPY --from=builder /app/dist/frontend-swift/browser /usr/share/nginx/html


COPY nginx.conf /etc/nginx/conf.d/default.conf
