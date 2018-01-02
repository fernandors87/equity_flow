# frozen_string_literal: true

require "rails_helper"

RSpec.describe "/api/v1/accounts", type: :request do
  before do
    a1 = create(:account, name: "n8")
    a2 = create(:account, name: "n7", parent: a1)
    a3 = create(:account, name: "n3")
    create(:account, name: "n6", parent: a2)
    create(:account, name: "n5", parent: a2)
    create(:account, name: "n4", parent: a1)
    create(:account, name: "n2", parent: a3)
    create(:account, name: "n1", parent: a3)
  end

  describe("GET") do
    it "render all accounts as json ordered by id" do
      get "/api/v1/accounts"
      expect(response).to have_http_status(200)
      expect(response.content_type).to eq("application/json")
      parsed_body = response.parsed_body.map { |x| x.except("created_at", "updated_at") }
      expect(parsed_body).to eq([
        { "id" => 1, "name" => "n8", "full_name" => "n8",
          "type" => "income", "description" => "", "level" => 1, "parent_id" => nil },
        { "id" => 2, "name" => "n7", "full_name" => "n8:n7",
          "type" => "income", "description" => "", "level" => 2, "parent_id" => 1 },
        { "id" => 3, "name" => "n3", "full_name" => "n3",
          "type" => "income", "description" => "", "level" => 1, "parent_id" => nil },
        { "id" => 4, "name" => "n6", "full_name" => "n8:n7:n6",
          "type" => "income", "description" => "", "level" => 3, "parent_id" => 2 },
        { "id" => 5, "name" => "n5", "full_name" => "n8:n7:n5",
          "type" => "income", "description" => "", "level" => 3, "parent_id" => 2 },
        { "id" => 6, "name" => "n4", "full_name" => "n8:n4",
          "type" => "income", "description" => "", "level" => 2, "parent_id" => 1 },
        { "id" => 7, "name" => "n2", "full_name" => "n3:n2",
          "type" => "income", "description" => "", "level" => 2, "parent_id" => 3 },
        { "id" => 8, "name" => "n1", "full_name" => "n3:n1",
          "type" => "income", "description" => "", "level" => 2, "parent_id" => 3 }
      ])
    end
  end
end
