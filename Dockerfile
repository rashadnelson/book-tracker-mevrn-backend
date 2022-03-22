# Image layer - downloaded the Node image from Docker Hub
FROM node:16.14.2-alpine

# Image layer - Set the working directory to /app
WORKDIR /app

# Image layer - copied the package.json for dependencies
COPY package.json .

# Image layer - ran npm install.  Assigned to the build portion of the project.
RUN npm install

# Image layer - copied all the code
COPY . ./ 

# Image layer - this line does nothing but informs other developers that this app ran on port 5000 locally.
EXPOSE 5000

# Image layer - setting Node entry point.  Assigned to the container when we actually run it.
CMD ["npm", "run", "start"]
