# frozen_string_literal: true

class Deal < ApplicationRecord
  has_many :splits, dependent: :destroy
  has_many :accounts, through: :splits, inverse_of: :deals

  validates :splits, length: { minimum: 2 }
  validate :imbalance

  def as_json(options = {})
    super(options.merge(include: { splits: { except: [:deal_id] } }))
  end

  def balance
    splits.map(&:signed_value).sum
  end

  private

  def imbalance
    errors.add(:splits, :imbalance, balance: balance) unless balance.zero?
  end
end
