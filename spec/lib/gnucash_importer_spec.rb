# frozen_string_literal: true

require "rails_helper"
require_relative "../../lib/gnucash_importer"

RSpec.describe "GnucashImporter" do
  let(:book) { Gnucash.open("spec/lib/sample.gnucash") }

  it "transform gnucash accounts to application accounts" do
    branches = book.accounts.reject { |x| x.type == "ROOT" }
    accounts = GnucashImporter.transform_accounts(branches)

    expect(accounts.values.size).to eq(63)
    expect(accounts.values).to all(be_valid)

    parents = accounts.values.map(&:parent).compact
    expect(parents.size).to eq(58)
  end

  it "transform gnucash transactions to application deals" do
    accounts = GnucashImporter.import_accounts!(book)

    deals = GnucashImporter.transform_transactions(accounts, book.transactions)
    expect(deals.values.size).to eq(473)
    expect(deals.values).to all(be_valid)

    splits = deals.flat_map { |_, v| v.splits }
    expect(splits.size).to eq(2198)
    expect(splits).to all(be_valid)
  end

  it "import gnucash accounts" do
    accounts = GnucashImporter.import_accounts!(book)
    expect(accounts.values.map(&:persisted?)).to be_truthy
    expect(Account.count).to eq(63)
  end

  it "import gnucash transactions" do
    accounts = GnucashImporter.import_accounts!(book)
    deals = GnucashImporter.import_transactions!(book, accounts)
    expect(deals.values.map(&:persisted?)).to be_truthy
    expect(Deal.count).to eq(473)
  end

  it "remove persisted accounts before the import" do
    account = create(:account)
    expect { GnucashImporter.import_accounts!(book) }.not_to raise_error
    expect { Account.find(account.id) }.to raise_error(ActiveRecord::RecordNotFound)
  end

  it "remove persisted deals before the import" do
    deal = create(:deal)
    accounts = GnucashImporter.import_accounts!(book)
    expect { GnucashImporter.import_transactions!(book, accounts) }.not_to raise_error
    expect { Deal.find(deal.id) }.to raise_error(ActiveRecord::RecordNotFound)
  end
end
