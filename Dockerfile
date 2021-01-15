# The node:10 Docker image ships with NPM 6.14. Beware of using a new node image version (node:alpine for example).
# It may ship with NPM 7.x, which has a different and stricter way of dealing with (peer) dependencies.
# You will run unto trouble.
FROM node:10 as builder

RUN npm --version

# build-time variables
# prod|sandbox its value will be come from outside
# ARG env=prod

RUN apt-get install git bash

WORKDIR /appdir
COPY package.json angular.json tsconfig.json tsconfig.app.json /appdir/
# I specifically chose 9.1.12, because this is the cli version that I had running locally and that worked
RUN npm install -g @angular/cli@9.1.12
RUN cd /appdir && npm install
COPY /src/ /appdir/src/

RUN cd /appdir && ng build --prod

# Build a small nginx image with static website
FROM nginx:alpine
RUN apk update && apk add --no-cache bash

# Remove the default nginx website
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /appdir/dist/oba-portal-app /usr/share/nginx/html
# Remove the default nginx config
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/cert.crt /etc/nginx/conf.d
COPY nginx/private.key /etc/nginx/conf.d
# This docker.conf configures NGINX as a web server (instead of as a reverse proxy for local development)
COPY nginx/oba-portal-docker.conf /etc/nginx/conf.d
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]


