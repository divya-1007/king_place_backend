# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /server

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose a port (change this if your app listens on a different port)
EXPOSE 8000

# Define the command to run your application
CMD ["node", "server.js"]