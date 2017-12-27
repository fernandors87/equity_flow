# frozen_string_literal: true

namespace :test do
  task js: :environment do
    sh "yarn test"
  end

  task ruby: :environment do
    sh "rspec"
  end
end

task test: :environment do
  %w[ruby js].each { |t| Rake::Task["test:#{t}"].invoke }
end
