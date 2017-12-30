# frozen_string_literal: true

require "rails_helper"

RSpec.describe "/api/v1/splits", type: :request do
  before { create(:deal) }

  describe("GET") do
    it "render all splits as json" do
      get "/api/v1/splits"

      expect(response).to have_http_status(200)
      expect(response.content_type).to eq("application/json")
      expect(response.parsed_body).to eq([
        {
          "id" => 1,
          "account_id" => 1,
          "deal_id" => 1,
          "date" => "2018-01-01",
          "position" => "debit",
          "value" => "9.99"
        },
        {
          "id" => 2,
          "account_id" => 2,
          "deal_id" => 1,
          "date" => "2018-01-01",
          "position" => "credit",
          "value" => "9.99"
        }
      ])
    end
  end
end
