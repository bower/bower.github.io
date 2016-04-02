FROM node:5.10.0

RUN mkdir -p /opt/code
WORKDIR /opt/code

RUN npm install -g bower && \
    npm install -g grunt-cli && \
    apt-get update && \
    apt-get install -y ruby ruby-dev && \
    gem install jekyll
