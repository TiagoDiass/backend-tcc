# base image
#FROM node:10.16.3
FROM node:14.17.1

# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# env
ENV PATH /usr/src/app/node_modules:$PATH

# run commands - config linux
#RUN

# install and cache app dependencies
ADD ./package.json /usr/src/app
RUN yarn install

# start app
#CMD ["npm", "start"]