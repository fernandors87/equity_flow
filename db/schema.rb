# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20171222131403) do

  create_table "accounts", force: :cascade do |t|
    t.string "name"
    t.string "description", default: ""
    t.string "type"
    t.integer "parent_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["parent_id"], name: "index_accounts_on_parent_id"
  end

  create_table "deals", force: :cascade do |t|
    t.date "date"
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "splits", force: :cascade do |t|
    t.integer "account_id"
    t.integer "deal_id"
    t.string "position"
    t.decimal "value", precision: 10, scale: 12
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account_id"], name: "index_splits_on_account_id"
    t.index ["deal_id"], name: "index_splits_on_deal_id"
  end

end
