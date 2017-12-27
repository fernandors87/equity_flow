# frozen_string_literal: true

namespace :lint do
  task js: :environment do
    sh "yarn lint"
  end

  task ruby: :environment do
    sh "rubocop"
  end

  namespace :ruby do
    task fix: :environment do
      sh "rubocop -a"
    end
  end
end

task lint: :environment do
  %w[ruby js].each { |t| Rake::Task["lint:#{t}"].invoke }
end
