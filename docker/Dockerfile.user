FROM node:20.12.0-alpine3.19

WORKDIR /usr/src/app

COPY package.json package-lock.json turbo.json tsconfig.json ./

COPY apps ./apps
COPY packages ./packages

# Clear any existing proxy configurations
RUN npm config delete proxy
RUN npm config delete https-proxy

# Set a faster registry mirror and increase fetch timeout
RUN npm config set registry https://registry.npmmirror.com/
RUN npm config set fetch-retries 5
RUN npm config set fetch-timeout 120000

# Install Dependencies
RUN npm install --legacy-peer-deps

# Generate prisma
RUN npm run db:generate

# Build the application
RUN npm run build

CMD ["npm", "run", "start-user-app"]
