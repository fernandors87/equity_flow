# frozen_string_literal: true

class Account < ApplicationRecord
  extend Enumerize

  self.inheritance_column = nil

  before_save :resolve_level

  has_many :splits, dependent: :destroy
  has_many :deals, through: :splits, inverse_of: :accounts, dependent: :destroy
  belongs_to :parent, class_name: "Account", foreign_key: "parent_id", optional: true, inverse_of: "children"
  has_many :children, class_name: "Account", foreign_key: "parent_id", inverse_of: "parent", dependent: :destroy

  enumerize :type, in: %i[asset liability equity income expense]

  validates :name, presence: true, uniqueness: { scope: :parent_id }
  validates :type, presence: true
  validate :self_reference

  def ancestor_ids
    return [] if parent.blank?
    parent.ancestor_ids + [parent_id]
  end

  def ancestors
    Account.where(id: ancestor_ids)
  end

  def full_name
    ancestors.pluck(:name).join(":")
    parent ? [parent.full_name, name].join(":") : name
  end

  private

  def resolve_level
    self.level = (self.parent.try(:level) || 0) + 1
    self.children.each(&:save!) if self.level_changed?
  end

  def self_reference
    errors.add(:parent_id, :self_reference, {}) if parent.present? && id == parent.id
  end
end
