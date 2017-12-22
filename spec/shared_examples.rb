# frozen_string_literal: true

RSpec.shared_examples "validate presence of" do |*attributes|
  attributes.each do |att|
    it { expect(subject).to validate_presence_of(att) }
  end
end
