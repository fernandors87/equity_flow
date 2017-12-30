# frozen_string_literal: true

class Split < ApplicationRecord
  extend Enumerize

  belongs_to :account
  belongs_to :deal, dependent: :destroy

  # TODO: remove position concept
  enumerize :position, in: %i[debit credit]

  validates :account, presence: true
  validates :deal, presence: true
  validates :position, presence: true
  validates :value, presence: true, numericality: { greater_than: 0 }

  delegate :date, to: :deal, allow_nil: true

  def signed_value
    position.credit? ? -value : value
  end

  def as_json(options = {})
    super(options.merge(methods: :date))
  end
end
