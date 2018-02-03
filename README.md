# EQUITY FLOW

It's a [GnuCash](https://gnucash.org) report front-end.

## Developer Guide

[![CircleCI](https://circleci.com/gh/fernandors87/equity_flow.svg?style=shield)](https://circleci.com/gh/fernandors87/equity_flow)

### System Dependencies

- [RVM 1.29+](https://rvm.io/rvm/install)
- [Ruby 2.4.x](https://rvm.io/rubies/installing)
- [Node.js 6.7+](https://nodejs.org/en/download/package-manager)
- [SQLite 3.x](https://www.sqlite.org/download.html)
- [Yarn 1.3.x](https://yarnpkg.com/en/docs/install)
- [Docker Compose 1.17.0](https://yarnpkg.com/en/docs/install)

### Configuration

1. Clone this repository

    ```shell
    $ git clone git@github.com:fernandors87/equity_flow.git
    ```

2. Set your system to use the right Ruby environment

    ```shell
    $ rvm use 2.4.1@equity_flow
    ```

3. Install Ruby dependencies

    ```shell
    $ gem install bundler
    $ bundle install
    ```

4. Install Javascript dependencies

    ```shell
    $ yarn install
    ```

5. Create the database

    ```shell
    $ rake db:reset
    ```

### Starting the application

1. Load an example [GnuCash](https://gnucash.org) transaction sheet:

    ```shell
    $ rake gnucash[/path/to/project/spec/lib/sample.gnucash]
    ```

2. Serve application assets(css, js, etc.) on development environment by starting the [webpack-dev-server](https://webpack.js.org):

    ```shell
    $ webpack-dev-server
    ```

3. Start the Rails server on another shell tab:

    ```shell
    $ rails server
    ```

### Testing

- Running back-end & front-end tests respectively:

    ```shell
    $ bundle exec rspec
    $ yarn test
    ```

- Generate coverage reports:

    ```shell
    $ COVERAGE=1 bundle exec rspec # ./coverage/ruby
    $ yarn test --coverage # ./coverage/js
    ```

## Docker Compose setup

This method is indicated for whom don't want to setup a native Ruby environment, or just want to make the app run as fast as possible.

For this setup, the only required dependencies are [Docker Engine](https://docs.docker.com/engine/installation) and [Docker Compose](https://docs.docker.com/compose/install/#install-compose).

After install the dependencies and clone this repository, just type:

        $ docker-compose up

Be patient if you're running this command for the first time, this will take a while.

When all containers get up, just access the app through http://localhost:3000.

Most of changes made to source code will be automatically be updated to Docker containers.
But in some situations (like add a new Ruby/JS dependency) a rebuild may be necessary:

        $ docker-compose up --build
