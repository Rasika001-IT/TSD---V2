FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

# Copy everything EXCEPT .env
COPY . .

# Remove local .env if it exists to prevent it from overriding build args
RUN rm -f .env

# Accept build arguments for production URLs
ARG VITE_API_URL
ARG VITE_FRONTEND_URL

# Create production .env file from build arguments
RUN echo "VITE_API_URL=$VITE_API_URL" > .env && \
    echo "VITE_FRONTEND_URL=$VITE_FRONTEND_URL" >> .env

RUN npm run build

FROM nginx:alpine AS production

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider --no-check-certificate http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]