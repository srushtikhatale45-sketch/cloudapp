FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
# Create temp folder for extraction
RUN mkdir -p temp
EXPOSE 3004
CMD ["node", "src/server.js"]