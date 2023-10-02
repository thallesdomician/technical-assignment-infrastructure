# Use an official Node.js LTS 18 image as the base image
FROM node:18

# Create and set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the project files to the container
COPY . .

# Expose the port your application will run on (replace 3000 with your actual port)
EXPOSE 3000

# Define the command to start your application (replace "start" with your actual script)
CMD ["npm", "start"]
