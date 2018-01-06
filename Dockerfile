FROM ruby:2.4.3-alpine3.7
LABEL maintainer="fernandors87@gmail.com"

ENV RAILS_ENV production
ENV NODE_ENV production
ENV SECRET_KEY_BASE $(openssl rand -base64 32)

WORKDIR /opt/equity_flow
COPY . /opt/equity_flow

RUN apk update && apk add gcc g++ make sqlite-dev tzdata nodejs yarn git
RUN gem install bundler && bundle install --without development test
RUN yarn install --prod
RUN rake db:create && rake db:migrate
RUN rake webpacker:compile

EXPOSE 3000
CMD rails server
