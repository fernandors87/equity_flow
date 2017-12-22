# frozen_string_literal: true

class CreateDeals < ActiveRecord::Migration[5.1]
  def change
    create_table :deals do |t|
      t.date :date
      t.string :description

      t.timestamps
    end
  end
end
