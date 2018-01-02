# frozen_string_literal: true

FactoryBot.define do
  factory :account do
    sequence(:name) { |n| "account_#{n}" }
    type "income"
  end
end
