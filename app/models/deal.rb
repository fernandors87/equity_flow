# frozen_string_literal: true

class Deal < ApplicationRecord
  has_many :splits, dependent: :destroy
  has_many :accounts, through: :splits, inverse_of: :deals

  validates :splits, length: { minimum: 2 }
  validate :balance

  private

  def balance
    signed = splits.map(&:signed_value).sum
    errors.add(:splits, :imbalance, balance: signed) unless signed.zero?
  end
end
