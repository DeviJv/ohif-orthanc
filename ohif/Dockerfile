# Stage 1: Build OHIF v3.9 from official source
# This fixes the "segmentationRepresentations is undefined" capture bug
FROM node:18-slim AS builder

WORKDIR /app

# Install git
RUN apt-get update && apt-get install -y git ca-certificates python3 make g++ --no-install-recommends && rm -rf /var/lib/apt/lists/*

# Yarn is already pre-installed in the node:18-slim image
RUN git config --global http.sslVerify false

# Clone OHIF Viewers v3.9.0 (stable - segmentation capture bug is fixed)
RUN git clone --depth 1 --branch v3.9.0 https://github.com/OHIF/Viewers.git .

# Install all dependencies
RUN yarn install --frozen-lockfile --network-timeout 300000

# Build the app with PUBLIC_URL so assets are loaded correctly from the subpath
ENV PUBLIC_URL=/orthanc/ohif/
ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN yarn build

# ----------------------------------------------------------------
# Stage 2: Serve the build with lightweight nginx
# ----------------------------------------------------------------
FROM nginx:alpine

# Copy the freshly built OHIF files
COPY --from=builder /app/platform/app/dist /usr/share/nginx/html

# Copy our custom nginx config for OHIF container
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Override with our custom app-config.js (preserves all existing settings)
COPY app-config.js /usr/share/nginx/html/app-config.js

EXPOSE 80
