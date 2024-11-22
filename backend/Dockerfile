# Use Node.js LTS version as the base image
FROM node:16

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend code
COPY . .

# Expose the port your backend runs on
EXPOSE 5000

# Start the backend
CMD ["npm", "start"]
