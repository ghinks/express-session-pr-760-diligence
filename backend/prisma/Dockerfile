# Use the official lightweight Node.js image
FROM node:13.6.0-slim

RUN apt-get -qy update && apt-get -qy install openssl

# Get nano
RUN apt-get update && apt-get install nano

# ARG + ENV - see: https://vsupalov.com/docker-arg-env-variable-guide/
# ARGs only available during the build of a Docker image (run, etc.)
# ENV values are available to containers, but also during Docker build 
# starting with the line where they are introduced.


ARG PRISMA_NPM_PKG
RUN yarn global add $PRISMA_NPM_PKG


WORKDIR /app


COPY ./ ./prisma/


CMD prisma studio --experimental
