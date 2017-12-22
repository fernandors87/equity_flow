# frozen_string_literal: true

class Split < ApplicationRecord
  extend Enumerize

  belongs_to :account
  belongs_to :deal, dependent: :destroy

  enumerize :position, in: %i[debit credit]

  validates :account, presence: true
  validates :deal, presence: true
  validates :position, presence: true
  validates :value, presence: true, numericality: { greater_than: 0 }

  def signed_value
    position.credit? ? value * -1 : value
  end
end
