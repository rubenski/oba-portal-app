# The builder from node image
FROM node:alpine as builder

# build-time variables 
# prod|sandbox its value will be come from outside 
ARG env=prod

RUN apk update && apk add --no-cache make git bash

# Move our files into directory name "app"
WORKDIR /appdir
COPY package.json angular.json tsconfig.json tsconfig.app.json /appdir/
RUN npm install @angular/cli@8.1.0 -g
RUN cd /appdir && npm install
COPY /src/  /appdir/src/

RUN cd /appdir && ng build --prod

# Build a small nginx image with static website
FROM nginx:alpine
RUN apk update && apk add --no-cache bash
RUN rm -rf /usr/share/nginx/html/*
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /appdir/dist/oba-portal-app /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
