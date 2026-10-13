FROM node:24-alpine AS build

WORKDIR /app
ENV PATH=/app/node_modules/.bin:$PATH

RUN corepack enable

COPY package.json ./
COPY pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --silent

COPY . ./
RUN pnpm run build

FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
