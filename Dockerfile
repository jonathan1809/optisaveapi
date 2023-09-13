# Start with the offical node base image to build native node modules
FROM node:18.17 AS compile

# Grab the NPM_TOKEN for our npmrc
ARG EnvironmentVariable
ARG RAILWAY_ENVIRONMENT
ENV RAILWAY_ENVIRONMENT=$RAILWAY_ENVIRONMENT

COPY . /project
WORKDIR /project

# Build the application from typescript source
RUN yarn &&\
  rm -f .npmrc
RUN yarn build

# Move out the built files into a app and add the package files
RUN mkdir /app
RUN mkdir /app/files
RUN mv /project/dist /app/dist
RUN mv /project/package.json /app/package.json
RUN mv /project/yarn.lock /app/yarn.lock
RUN mv /project/files/CONCENTRADO2019.xlsx /app/files/CONCENTRADO2019.xlsx
RUN rm -r /project

# Install only the production dependencies
WORKDIR /app
RUN yarn --production &&\
  rm -f .npmrc

# Finish with the official alpine image as best practices
FROM node:18.17
COPY --from=compile /app /app
WORKDIR /app

# Run the server
ENV NODE_ENV production
# ENV PORT 3000
CMD yarn seed:dev; yarn start
# EXPOSE 3000