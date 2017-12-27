# frozen_string_literal: true

require "rails_helper"

RSpec.describe "/api/v1/accounts", type: :request do
  before { create_list(:account, 1) }

  describe("GET") do
    it "render all accounts as json" do
      get "/api/v1/accounts"

      expect(response).to have_http_status(200)
      expect(response.content_type).to eq("application/json")
      parsed_body = response.parsed_body.map { |x| x.except("created_at", "updated_at") }
      expect(parsed_body).to eq([
        {
          "id" => 1,
          "name" => "account_1",
          "description" => "account description",
          "type" => "income",
          "level" => 0,
          "parent_id" => nil
        }
      ])
    end
  end
end
