# frozen_string_literal: true

require "rails_helper"

RSpec.describe "/api/v1/accounts", type: :request do
  before do
    a1 = create(:account, name: "n8")
    a2 = create(:account, name: "n7", parent: a1)
    a3 = create(:account, name: "n6", parent: a2)
    a4 = create(:account, name: "n5", parent: a2)
    a5 = create(:account, name: "n4", parent: a1)
    a6 = create(:account, name: "n3")
    a7 = create(:account, name: "n2", parent: a6)
    a8 = create(:account, name: "n1", parent: a6)
  end

  describe("GET") do
    it "render all accounts as json ordered by full name" do
      get "/api/v1/accounts"

      expect(response).to have_http_status(200)
      expect(response.content_type).to eq("application/json")
      parsed_body = response.parsed_body.map { |x| x.except("created_at", "updated_at") }
      expect(parsed_body).to eq([
        {
          "id" => 1,
          "name" => "n8",
          "full_name" => "n8",
          "description" => "account description",
          "type" => "income",
          "level" => 1,
          "parent_id" => nil
        },
        {
          "id" => 2,
          "name" => "n7",
          "full_name" => "n8:n7",
          "description" => "account description",
          "type" => "income",
          "level" => 2,
          "parent_id" => 1
        },
        {
          "id" => 3,
          "name" => "n6",
          "full_name" => "n8:n7:n6",
          "description" => "account description",
          "type" => "income",
          "level" => 3,
          "parent_id" => 2
        },
        {
          "id" => 4,
          "name" => "n5",
          "full_name" => "n8:n7:n5",
          "description" => "account description",
          "type" => "income",
          "level" => 3,
          "parent_id" => 2
        },
        {
          "id" => 5,
          "name" => "n4",
          "full_name" => "n8:n4",
          "description" => "account description",
          "type" => "income",
          "level" => 2,
          "parent_id" => 1
        },
        {
          "id" => 6,
          "name" => "n3",
          "full_name" => "n3",
          "description" => "account description",
          "type" => "income",
          "level" => 1,
          "parent_id" => nil
        },
        {
          "id" => 7,
          "name" => "n2",
          "full_name" => "n3:n2",
          "description" => "account description",
          "type" => "income",
          "level" => 2,
          "parent_id" => 6
        },
        {
          "id" => 8,
          "name" => "n1",
          "full_name" => "n3:n1",
          "description" => "account description",
          "type" => "income",
          "level" => 2,
          "parent_id" => 6
        }
      ])
    end
  end
end
