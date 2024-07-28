FROM node:lts-alpine3.20 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
COPY .env ./
RUN ls -la
RUN npm run build

FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
