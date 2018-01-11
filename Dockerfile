FROM ruby:2.4.3-alpine3.7
LABEL maintainer="fernandors87@gmail.com"

WORKDIR /app
COPY . /app

RUN apk add --update gcc g++ make git openssh python sqlite-dev tzdata nodejs yarn
RUN gem install bundler && bundle install --jobs 4 --retry 3
RUN yarn install
RUN bundle exec rake db:create
RUN bundle exec rake db:migrate

EXPOSE 3000 3035
