# frozen_string_literal: true

require "rails_helper"

RSpec.describe Account, type: :model do
  let(:a1) { create(:account, name: "n1") }
  let(:a2) { create(:account, name: "n2", parent: a1) }
  let(:a3) { create(:account, name: "n3", parent: a2) }
  let(:a4) { create(:account, name: "n4", parent: a1) }
  let(:a5) { create(:account, name: "n5") }
  let(:a6) { create(:account, name: "n6", parent: a5) }
  let(:a7) { create(:account, name: "n7", parent: a5) }
  let(:a8) { create(:account, name: "n8", parent: a7) }
  let(:a9) { create(:account, name: "n9", parent: a8) }

  subject { a1 }

  it { expect(subject).to enumerize(:type).in(:asset, :liability, :equity, :income, :expense) }
  it { expect(subject).to validate_presence_of(:name) }
  it { expect(subject).to validate_presence_of(:type) }
  it { expect(subject).to validate_uniqueness_of(:name).scoped_to(:parent_id) }
  it { expect(subject).to have_many(:splits).dependent(:destroy) }
  it { expect(subject).to have_many(:deals).through(:splits).inverse_of(:accounts).dependent(:destroy) }

  it do
    expect(subject).to belong_to(:parent).class_name("Account").with_foreign_key("parent_id").inverse_of("children")
  end

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

  it "should calculate level when account is saved" do
    a1 = create(:account)

    a1.children << create(:account)
    a2 = a1.children.first

    a2.children << create(:account)
    a3 = a2.children.first

    expect(a1.level).to eq(1)
    expect(a2.level).to eq(2)
    expect(a3.level).to eq(3)

    a2.update_attributes!(parent: a1)
    [a1, a2, a3].each(&:reload)

    expect(a1.level).to eq(1)
    expect(a2.level).to eq(2)
    expect(a3.level).to eq(3)
  end

  it "should fetch ancestors ids" do
    expect(a1.ancestor_ids).to be_empty
    expect(a2.ancestor_ids).to eq([a1].map(&:id))
    expect(a3.ancestor_ids).to eq([a1, a2].map(&:id))
    expect(a4.ancestor_ids).to eq([a1].map(&:id))
    expect(a5.ancestor_ids).to be_empty
    expect(a6.ancestor_ids).to eq([a5].map(&:id))
    expect(a7.ancestor_ids).to eq([a5].map(&:id))
    expect(a8.ancestor_ids).to eq([a5, a7].map(&:id))
    expect(a9.ancestor_ids).to eq([a5, a7, a8].map(&:id))
  end

  it "should fetch ancestors" do
    expect(a1.ancestors).to be_empty
    expect(a2.ancestors).to eq([a1])
    expect(a3.ancestors).to eq([a1, a2])
    expect(a4.ancestors).to eq([a1])
    expect(a5.ancestors).to be_empty
    expect(a6.ancestors).to eq([a5])
    expect(a7.ancestors).to eq([a5])
    expect(a8.ancestors).to eq([a5, a7])
    expect(a9.ancestors).to eq([a5, a7, a8])
  end

  it "should merge the names of all ancestors" do
    expect(a9.full_name).to eq("n5:n7:n8:n9")
  end
end
