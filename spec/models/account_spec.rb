# frozen_string_literal: true

require "rails_helper"

RSpec.describe Account, type: :model do
  it { expect(subject).to enumerize(:type).in(:asset, :liability, :equity, :income, :expense) }

  it { expect(subject).to validate_presence_of(:name) }
  it { expect(subject).to validate_presence_of(:type) }
  it { expect(subject).to validate_presence_of(:level).on(:save) }
  it { expect(subject).to validate_uniqueness_of(:name).scoped_to(:parent_id) }
  it { expect(subject).to validate_numericality_of(:level).is_greater_than_or_equal_to(0).on(:save) }

  it do
    expect(subject).to belong_to(:parent)
      .class_name("Account").with_foreign_key("parent_id").inverse_of("children")
  end

  it { expect(subject).to have_many(:splits).dependent(:destroy) }
  it { expect(subject).to have_many(:deals).through(:splits).inverse_of(:accounts).dependent(:destroy) }

  it do
    expect(subject).to have_many(:children)
      .class_name("Account").with_foreign_key("parent_id").inverse_of("parent").dependent("destroy")
  end

  it "should not allow an account be parent of itself" do
    account = create(:account)
    account.parent = account
    account.name = "other name"
    expect(account).to be_invalid
    expect(account.errors.details[:parent_id]).to include(error: :self_reference)
  end

  it "should calculate the account level" do
    account = create(:account)
    child = create(:account, parent: account)
    grandchild = create(:account, parent: child)

    expect(account.level).to eq(0)
    expect(child.level).to eq(1)
    expect(grandchild.level).to eq(2)

    child.reload
    child.parent = nil
    child.save

    grandchild.reload
    expect(child.level).to eq(0)
    expect(grandchild.level).to eq(1)
  end
end
