# EQUITY FLOW

It's a personal financial software.

## Developer Guide

### System Dependencies

- [RVM 1.29+](https://rvm.io/rvm/install)
- [Ruby 2.4.x](https://rvm.io/rubies/installing)
- [Node.js 6.7+](https://nodejs.org/en/download/package-manager)
- [SQLite 3.x](https://www.sqlite.org/download.html)
- [Yarn 1.3.x](https://yarnpkg.com/en/docs/install)

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
    $ rake db:create
    $ rake db:migrate
    ```

### Starting the application

1. Start the assets development server

    ```shell
    $ webpack-dev-server
    ```

2. Open another shell tab and start the Rails server

    ```shell
    $ rails server
    ```

### Tests

1. Tests

    ```shell
    $ rake build:test
    ```

2. Coverage

    ```shell
    $ rake build:coverage
    ```
