# Start with official lightweight Node.js image
FROM node:13.6.0-slim

# Get openssl
RUN apt-get -qy update && apt-get -qy install openssl

# Get nano
RUN apt-get -qy update && apt-get -qy install nano

# ARG + ENV - see: https://vsupalov.com/docker-arg-env-variable-guide/
# ARGs only available during the build of a Docker image (run, etc.)
# ENV values are available to containers, but also during Docker build 
# starting with the line where they are introduced.
# ENV vars set here are NOT listed in GCP Cloud Run's list of 
# "env variables on a service" which will over-ride values set here.

# Required for prisma to generate...
# +++++++++
ARG DB_URL
ENV DB_URL=$DB_URL

ARG PRISMA_NPM_PKG
ENV PRISMA_NPM_PKG=$PRISMA_NPM_PKG
# ---------

RUN yarn global add $PRISMA_NPM_PKG 


WORKDIR /app


# Copy package.json - and npm-package-lock.json, and yarn.lock, if they exist: https://stackoverflow.com/a/46801962
COPY package*.json yarn.lock* ./ 

COPY prisma ./prisma/

# Although docker-compose eventually aliases host src/ on top of src/ 
#for local builds, this happens later on.
COPY src ./src/


RUN yarn install

RUN prisma generate
# RUN ./node_modules/.bin/prisma generate


CMD ["yarn", "start"]
