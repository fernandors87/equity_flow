FROM ruby:2.4.3-alpine3.7
LABEL maintainer="fernandors87@gmail.com"

WORKDIR /app
COPY . /app

RUN apk update && apk add gcc g++ make sqlite-dev tzdata nodejs yarn git python
RUN gem install bundler && bundle install
RUN yarn install
RUN rake db:create && rake db:migrate

EXPOSE 3000 3035
