# frozen_string_literal: true

require "rails_helper"

RSpec.describe "/api/v1/deals", type: :request do
  before { create_list(:deal, 1) }

  describe("GET") do
    it "display all deals" do
      get "/api/v1/deals"

      expect(response).to have_http_status(200)
      expect(response.content_type).to eq("application/json")
      parsed_body = response.parsed_body.map { |x| x.except("created_at", "updated_at") }
      expect(parsed_body).to eq([
        {
          "id" => 1,
          "date" => "2018-01-01",
          "description" => "transaction desc",
          "splits" => [
            { "id" => 1, "account_id" => 1, "position" => "debit", "value" => "9.99" },
            { "id" => 2, "account_id" => 2, "position" => "credit", "value" => "9.99" }
          ]
        }
      ])
    end
  end
end
