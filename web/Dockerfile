FROM node:22.16.0-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install  && \
    npm run build

FROM nginx:alpine
COPY --from=builder /app/dist/web/browser /usr/share/nginx/static
COPY nginx.conf /etc/nginx/nginx.conf
COPY mime.types /etc/nginx/mime.types
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
