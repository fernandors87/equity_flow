# frozen_string_literal: true

task spec: :environment do
  sh "yarn test"
  sh "rspec"
end
