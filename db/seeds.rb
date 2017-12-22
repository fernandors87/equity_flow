# frozen_string_literal: true

ENV["RAILS_ENV"] ||= "dev"

logger = ActiveSupport::Logger.new(STDOUT)

Account.destroy_all

assets = Account.create(name: "Assets", type: :asset)
Account.create(name: "Bank", type: :asset, parent: assets)

Account.create(name: "Liabilities", type: :liability)
Account.create(name: "Equity", type: :equity)
Account.create(name: "Incomes", type: :income)
Account.create(name: "Expenses", type: :expense)

Account.all.each do |acc|
  logger.info(acc.as_json)
end
