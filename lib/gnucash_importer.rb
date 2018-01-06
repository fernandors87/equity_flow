# frozen_string_literal: true

require "gnucash"

module GnucashImporter
  class << self
    def import_accounts!(book)
      gnucash_accounts = book.accounts.reject { |x| x.type == "ROOT" }
      accounts = transform_accounts(gnucash_accounts)
      Account.transaction do
        Account.destroy_all
        accounts.values.map(&:save!)
      end
      accounts
    end

    def transform_accounts(accounts)
      accounts_by_id = accounts.map { |x| [x.id, transform_account(x)] }.to_h
      parents_by_child = accounts.map { |x| [x.id, accounts_by_id[x.parent_id]] }.to_h
      accounts_by_id.map do |id, account|
        account.parent = parents_by_child[id]
        [id, account]
      end.to_h
    end

    def transform_account(account)
      known_types = { "BANK" => "ASSET", "CASH" => "ASSET", "CREDIT" => "LIABILITY" }
      type = known_types[account.type] || account.type
      Account.new(name: account.name, type: type.downcase, description: account.description)
    end

    def import_transactions!(book, accounts_by_id)
      deals = transform_transactions(accounts_by_id, book.transactions)
      Deal.transaction do
        Deal.destroy_all
        deals.values.map(&:save!)
      end
      deals
    end

    def transform_transactions(accounts_by_id, transactions)
      transactions
        .map { |x| transform_transaction(accounts_by_id, x) }
        .select { |_, v| v.balance.zero? }.to_h
    end

    def transform_transaction(accounts_by_id, tx)
      splits = tx.splits.map { |s| transform_split(accounts_by_id, s) }.select { |s| s.value.positive? }
      [tx.id, Deal.new(date: tx.date, description: tx.description, splits: splits)]
    end

    def transform_split(accounts_by_id, split)
      account = accounts_by_id[split[:account].id]
      value = split[:value].to_r
      position = value.negative? ? :credit : :debit
      Split.new(account: account, position: position, value: value.abs)
    end
  end
end
