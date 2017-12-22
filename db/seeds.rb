# frozen_string_literal: true

ENV["RAILS_ENV"] ||= "dev"

logger = ActiveSupport::Logger.new(STDOUT)
ActiveRecord::Base.logger = logger

Account.destroy_all

assets = Account.create(name: "Assets", type: :asset)
bank = Account.create(name: "Bank", type: :asset, parent: assets)

Account.create(name: "Liabilities", type: :liability)
Account.create(name: "Equity", type: :equity)

incomes = Account.create(name: "Incomes", type: :income)
salary = Account.create(name: "Salary", type: :income, parent: incomes)

Account.create(name: "Expenses", type: :expense)

salary_jan = Deal.new(date: "2018-01-10")
salary_jan.splits.build([
  { account: bank, position: :debit, value: 1000 },
  { account: salary, position: :credit, value: 1000 }
])
salary_jan.save
