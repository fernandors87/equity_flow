class CreateAccounts < ActiveRecord::Migration[5.1]
  def change
    create_table :accounts do |t|
      t.string :name
      t.string :description, default: ""
      t.string :type
      t.belongs_to :parent
      t.timestamps
    end
  end
end
