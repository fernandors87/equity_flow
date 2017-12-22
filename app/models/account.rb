# frozen_string_literal: true

class Account < ApplicationRecord
  extend Enumerize

  belongs_to :parent, class_name: "Account", foreign_key: "parent_id", optional: true, inverse_of: "children"
  has_many :children, class_name: "Account", inverse_of: "parent", dependent: :destroy

  enumerize :type, in: %i[asset liability equity income expense]

  validates :name, presence: true, uniqueness: { scope: :parent_id }
  validates :type, presence: true
  validate :self_reference

  private

  def self_reference
    errors.add(:parent_id, :self_reference, {}) if id == parent_id && parent.present?
  end
end
