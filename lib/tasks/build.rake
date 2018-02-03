# frozen_string_literal: true

desc "Run essential build tasks"
task :build do
  sh "CI=1 bundle exec rspec"
  sh "yarn test --coverage"
  sh "bundle exec rubocop"
  sh "yarn eslint:all"
  sh "bundle exec rake assets:precompile"
end
