# frozen_string_literal: true

class RemoveTimestampsFromSplits < ActiveRecord::Migration[5.1]
  def change
    remove_column :splits, :created_at, :timestamp
    remove_column :splits, :updated_at, :timestamp
  end
end
