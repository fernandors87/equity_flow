# frozen_string_literal: true

require "rails_helper"

RSpec.describe Split, type: :model do
  it { expect(subject).to enumerize(:position).in(:debit, :credit) }

  it { expect(subject).to validate_presence_of(:account) }
  it { expect(subject).to validate_presence_of(:deal) }
  it { expect(subject).to validate_presence_of(:position) }
  it { expect(subject).to validate_numericality_of(:value).is_greater_than(0) }

  it { expect(subject).to belong_to(:account) }
  it { expect(subject).to belong_to(:deal).dependent(:destroy) }
end
