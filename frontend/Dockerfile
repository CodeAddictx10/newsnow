FROM node:22-alpine

WORKDIR /app/frontend

COPY package.json .
COPY pnpm-lock.yaml .

RUN npm i -g pnpm serve

RUN pnpm install

COPY . .

COPY .env.example .env

RUN pnpm run build

EXPOSE 3000

CMD ["serve","-s","dist"]
