# frozen_string_literal: true

require "rails_helper"

RSpec.describe Deal, type: :model do
  it { expect(subject).to have_many(:splits).dependent(:destroy) }
  it { expect(subject).to have_many(:accounts).through(:splits).inverse_of(:deal) }
end
