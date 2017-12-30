# frozen_string_literal: true

require "rails_helper"

RSpec.describe Split, type: :model do
  subject { create(:deal).splits.first }

  it { expect(subject).to enumerize(:position).in(:debit, :credit) }

  it { expect(subject).to validate_presence_of(:account) }
  it { expect(subject).to validate_presence_of(:deal) }
  it { expect(subject).to validate_presence_of(:position) }
  it { expect(subject).to validate_numericality_of(:value).is_greater_than(0) }

  it { expect(subject).to belong_to(:account) }
  it { expect(subject).to belong_to(:deal).dependent(:destroy) }

  it "should use custom json serializer" do
    expect(subject.as_json).to eq(
      "id" => 1,
      "date" => Date.parse("2018-01-01"),
      "account_id" => 1,
      "deal_id" => 1,
      "position" => "debit",
      "value" => BigDecimal("9.99")
    )
  end
end
