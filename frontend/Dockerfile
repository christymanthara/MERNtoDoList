# Use a Node.js base image to build the app
FROM node:18 as builder

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the frontend for production
RUN npm run build

# Use a lightweight web server for serving the built files
FROM nginx:alpine

# Copy build output to nginx's default HTML folder
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

# Expose the default NGINX port
EXPOSE 80

# Command to start NGINX
CMD ["nginx", "-g", "daemon off;"]
