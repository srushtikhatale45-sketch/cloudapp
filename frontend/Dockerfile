# Build stage
FROM node:20-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ARG VITE_AUTH_URL
ARG VITE_BACKUP_URL
ARG VITE_RESTORE_URL
ARG VITE_ANALYTICS_URL
ENV VITE_AUTH_URL=$VITE_AUTH_URL
ENV VITE_BACKUP_URL=$VITE_BACKUP_URL
ENV VITE_RESTORE_URL=$VITE_RESTORE_URL
ENV VITE_ANALYTICS_URL=$VITE_ANALYTICS_URL

RUN npm run build

# Serve stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
