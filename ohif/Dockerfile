# PRODUCTION-READY OHIF VIEWER
# This image bundles the stable production build into a lightweight Nginx container for easy deployment.

FROM nginx:alpine

# Copy all stable production assets from the local folder to the container
COPY . /usr/share/nginx/html/

# Expose port 80 for the internal network
EXPOSE 80

# The configuration app-config.js is already inside the folder and will be served as /app-config.js
