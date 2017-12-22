# frozen_string_literal: true

FactoryBot.define do
  factory :debit, class: Split do
    position "debit"
    value "9.99"
    account { build(:account, type: :asset) }
  end

  factory :credit, class: Split do
    position "credit"
    value "9.99"
    account { build(:account, type: :income) }
  end
end
