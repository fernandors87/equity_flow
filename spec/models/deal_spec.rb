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
end
