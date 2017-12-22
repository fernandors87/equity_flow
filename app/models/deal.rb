# frozen_string_literal: true

class Deal < ApplicationRecord
  has_many :splits, dependent: :destroy
  has_many :accounts, through: :splits, inverse_of: :deal
end
