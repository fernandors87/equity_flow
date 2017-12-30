# frozen_string_literal: true

class Account < ApplicationRecord
  extend Enumerize

  self.inheritance_column = nil

  before_save :calculate_level

  belongs_to :parent, class_name: "Account", foreign_key: "parent_id", optional: true, inverse_of: "children"
  has_many :children, class_name: "Account", foreign_key: "parent_id", inverse_of: "parent", dependent: :destroy
  has_many :splits, dependent: :destroy
  has_many :deals, through: :splits, inverse_of: :accounts, dependent: :destroy

  enumerize :type, in: %i[asset liability equity income expense]

  validates :name, presence: true, uniqueness: { scope: :parent_id }
  validates :type, presence: true
  validates :level, presence: true, numericality: { greater_than_or_equal_to: 0 }, on: :save
  validate :self_reference

  # TODO: test
  def full_name
    parent ? [parent.full_name, name].join(":") : name
  end

  # TODO: test
  def as_json(options = {})
    if options.key?(:hierarchy)
      super(options).merge(children: children.map { |c| c.as_json(hierarchy: true) })
    else
      super(options)
    end
  end

  private

  def calculate_level
    self.level = parent.nil? ? 0 : parent.level + 1
    children.each(&:save)
  end

  def self_reference
    errors.add(:parent_id, :self_reference, {}) if parent.present? && id == parent.id
  end
end
