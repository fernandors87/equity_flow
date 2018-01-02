# frozen_string_literal: true

namespace :build do
  desc "Run all coverage suites"
  task :coverage do
    Rake::Task["build:coverage:js"].invoke
    Rake::Task["build:coverage:ruby"].invoke
  end

  namespace :coverage do
    desc "Run coverage suite for javascript code"
    task :js do
      sh "yarn test --coverage"
    end

    desc "Run coverage suite for ruby code"
    task :ruby do
      sh "COVERAGE=1 rspec"
    end
  end

  desc "Run all linters"
  task :lint do
    Rake::Task["build:lint:js"].invoke
    Rake::Task["build:lint:ruby"].invoke
  end

  namespace :lint do
    desc "Run linter for javascript code"
    task :js do
      sh "yarn lint"
    end

    desc "Run linter for ruby code"
    task :ruby do
      sh "rubocop"
    end
  end

  desc "Run all test suites"
  task :test do
    Rake::Task["build:test:js"].invoke
    Rake::Task["build:test:ruby"].invoke
  end

  namespace :test do
    desc "Run test suite for javascript code"
    task :js do
      sh "yarn test"
    end

    desc "Run test suite for ruby code"
    task :ruby do
      sh "rspec"
    end
  end
end

desc "Build the application by running the following subtasks: [tests, coverage, linters]"
task :build do
  Rake::Task["build:test"].invoke
  Rake::Task["build:coverage"].invoke
  Rake::Task["build:lint"].invoke
end
