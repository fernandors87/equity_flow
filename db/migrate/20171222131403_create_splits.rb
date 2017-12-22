# frozen_string_literal: true

class CreateSplits < ActiveRecord::Migration[5.1]
  def change
    create_table :splits do |t|
      t.belongs_to :account, foreign_key: true
      t.belongs_to :deal, foreign_key: true
      t.string :position
      t.decimal :value
      t.timestamps
    end
  end
end
