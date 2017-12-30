# frozen_string_literal: true

class AddLevelToAccounts < ActiveRecord::Migration[5.1]
  def change
    add_column :accounts, :level, :integer
  end
end
