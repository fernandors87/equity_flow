# frozen_string_literal: true

class CreateSplits < ActiveRecord::Migration[5.1]
  def change
    create_table :splits do |t|
      t.belongs_to :account
      t.belongs_to :deal
      t.string :position
      t.decimal :value, precision: 10, scale: 12
      t.timestamps
    end
  end
end
