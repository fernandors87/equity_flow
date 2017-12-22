# frozen_string_literal: true

FactoryBot.define do
  factory :account, class: Account do
    sequence(:name) { |n| "account_#{n}" }
    description "account description"
    type { Account.type.values.sample }
  end
end
