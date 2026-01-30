# 1. Base image
FROM node:20-alpine

# 2. Set working directory
WORKDIR /src

# 3. Copy dependency files
COPY package*.json ./

# 4. Install dependencies
RUN npm ci

# 5. Copy rest of the code
COPY . .

# 6. Build NestJS
RUN npm run build

# 7. Expose backend port
EXPOSE 3001

# 8. Start the app
CMD ["node", "dist/main.js"]
