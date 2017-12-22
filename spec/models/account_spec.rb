# frozen_string_literal: true

require "rails_helper"

RSpec.describe Account, type: :model do
  include_examples "validate presence of", :name, :type

  it { expect(subject).to validate_uniqueness_of(:name).scoped_to(:parent_id) }
  it { expect(subject).to enumerize(:type).in(:asset, :liability, :equity, :income, :expense) }

  it do
    expect(subject).to belong_to(:parent).class_name("Account").with_foreign_key("parent_id").inverse_of("children")
  end

  it do
    expect(subject).to have_many(:children).class_name("Account").inverse_of("parent").dependent("destroy")
  end

  it "should not allow an account be parent of itself" do
    account = create(:account)
    account.parent = account
    account.name = "other name"
    expect(account).to be_invalid
    expect(account.errors.details[:parent_id]).to include(error: :self_reference)
  end
end
