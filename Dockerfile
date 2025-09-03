# Use official Cypress base image (includes Node + Cypress browsers)
FROM cypress/included:14.0.3  

WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json tsconfig.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project
COPY . .

# Build TypeScript -> dist/
RUN npm run build

# Expose API port
EXPOSE 3000

# Start Express API
CMD ["npm", "start"]