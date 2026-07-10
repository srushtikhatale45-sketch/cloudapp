FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
# Create uploads folder for temporary files
RUN mkdir -p uploads
EXPOSE 3003
CMD ["node", "src/server.js"]