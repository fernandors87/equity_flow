# frozen_string_literal: true

class Account < ApplicationRecord
  extend Enumerize

  self.inheritance_column = nil

  belongs_to :parent, class_name: "Account", foreign_key: "parent_id", optional: true, inverse_of: "children"
  has_many :children, class_name: "Account", foreign_key: "parent_id", inverse_of: "parent", dependent: :destroy
  has_many :splits, dependent: :destroy
  has_many :deals, through: :splits, inverse_of: :account, dependent: :destroy

  enumerize :type, in: %i[asset liability equity income expense]

  validates :name, presence: true, uniqueness: { scope: :parent_id }
  validates :type, presence: true
  validate :self_reference

  private

  def self_reference
    errors.add(:parent_id, :self_reference, {}) if parent.present? && id == parent.id
  end
end
