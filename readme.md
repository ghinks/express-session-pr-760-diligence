# due diligence
Using a local docker postgres container and running prisma to setup. Some issues were
encountered and this small repo is intended to help overcome any doubts about the
prisma connect module.

# Setup

1. Navigate to the project folder (express-session-pr-760-diligence)
2. Install the npm packages, using ```yarn setup```. This could take a few minutes.
3. Run docker-compose file, using ```yarn start```
4. Run a first migration, using ```yarn migrate:first```. This creates the database tables (including Session).

This configures database, backend and prisma containers.
Details:
* prisma container mounted in the backend container
* Project src mounted in backend/src
* Project npm modules copied.
* Approach inspired by: https://github.com/CaptainChemist/blog-prisma2

# Running Tests for prisma-session-store

1. In a second console, navigate to the project folder (express-session-pr-760-diligence)
2. Enter the running backend container, with ```docker exec -it backend bash```
3. Navigate to prisma-session-store, with ```cd node_modules/\@quixo3/prisma-session-store/```
4. Install test dependencies (i.e. mocha), with ```yarn install ```
5. Run tests, with ```yarn test```

# Trying out Prisma

1. After setup (above), navigate to the project folder (express-session-pr-760-diligence)
2. Run ```yarn seed```, to seed the database with 2 users.
2. Run ```yarn start```; this starts the docker containers: database, backend, and prisma.

Prisma Studio ready at:http://localhost:5555
REST API ready at:http://localhost:2020
REST Endpoints:
* users/
* sessions/ (empty)



