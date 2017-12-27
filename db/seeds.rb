# frozen_string_literal: true

require "gnucash"

ENV["RAILS_ENV"] ||= "dev"

logger = ActiveSupport::Logger.new(STDOUT)
ActiveRecord::Base.logger = logger

book = Gnucash.open("/home/fernando/Dropbox/cash/cash.gnucash")

Account.destroy_all
book.accounts.sort_by(&:full_name).each do |account|
  next if account.type == "ROOT"
  type = case account.type
         when "BANK"
           "ASSET"
         when "CREDIT"
           "LIABILITY"
         else
           account.type
         end

  parent_name = account.full_name.split(":")[0..-2].join(":")
  parent = Account.all.find { |a| a.full_name == parent_name }
  Account.create!(name: account.name, type: type.downcase, parent: parent)
end

node = Nokogiri.XML(File.read("/home/fernando/Dropbox/cash/cash.gnucash"))
node.xpath("/gnc-v2/gnc:book").xpath("gnc:transaction").each do |tx_node|
  date = Date.parse(tx_node.xpath("trn:date-posted/ts:date").text.split(" ").first)
  description = tx_node.xpath("trn:description").text
  deal = Deal.new(date: date, description: description)
  tx_node.xpath("trn:splits/trn:split").each do |split_node|
    value = Rational(split_node.xpath("split:quantity").text)
    account_id = split_node.xpath("split:account").text
    account = book.find_account_by_id(account_id)
    local_account = Account.all.find { |a| a.full_name == account.full_name }
    position = value.negative? ? "credit" : "debit"
    deal.splits << Split.new(account: local_account, position: position, value: value.abs)
  end
  begin
    deal.save!
  rescue StandardError
    logger.error deal
    logger.error deal.splits
  end
end
