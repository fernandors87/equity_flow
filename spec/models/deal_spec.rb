# frozen_string_literal: true

require "rails_helper"

RSpec.describe Deal, type: :model do
  subject { build(:deal) }

  it { expect(subject).to have_many(:splits).dependent(:destroy) }
  it { expect(subject).to have_many(:accounts).through(:splits).inverse_of(:deals) }

  it "should validate that the length of :splits is at least 2" do
    subject.splits = []
    expect(subject).to be_invalid
    expect(subject.errors.details[:splits]).to match_array([{ error: :too_short, count: 2 }])
  end

  it "should validate splits balance" do
    subject.splits[0].value = 9.99
    subject.splits[1].value = 99.99
    expect(subject).to be_invalid
    expect(subject.errors.details[:splits]).to match_array([{ error: :imbalance, balance: -90 }])
  end

  it "should use custom json serializer" do
    expect(subject.as_json).to eq(
      "id" => nil,
      "date" => Date.parse("2018-01-01"),
      "description" => "transaction desc",
      "created_at" => nil,
      "updated_at" => nil,
      "splits" => [
        { "id" => nil, "account_id" => nil, "position" => "debit", "value" => BigDecimal("9.99") },
        { "id" => nil, "account_id" => nil, "position" => "credit", "value" => BigDecimal("9.99") }
      ]
    )
  end
end
