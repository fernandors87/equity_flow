# frozen_string_literal: true

FactoryBot.define do
  factory :deal do
    date "2018-01-01"
    description "transaction desc"

    after(:build) do |deal|
      deal.splits.build([attributes_for(:debit), attributes_for(:credit)])
    end
  end
end
