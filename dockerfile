# Stage 1: Build
FROM node:23 as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy built files from dist to nginx html folder
COPY --from=build /app/dist /usr/share/nginx/html

# Optional: Custom Nginx config for SPAs
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
