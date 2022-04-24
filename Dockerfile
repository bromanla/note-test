FROM node:16

WORKDIR /usr/src/app
COPY ./ ./

WORKDIR ./client
RUN npm ci
RUN npm run build
RUN rm -r node_modules

WORKDIR ../
RUN npm ci
RUN npm run build
RUN npm ci --only=production

EXPOSE 3000
CMD ["node", "dist/main"]