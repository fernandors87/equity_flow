# frozen_string_literal: true

require "rails_helper"

RSpec.describe "/api/v1/splits", type: :request do
  before { create(:deal) }

  describe("GET") do
    it "render splits within start & end date" do
      Deal.transaction do
        ((13.months.ago.to_date)..(Time.zone.today))
          .each { |d| create(:deal, date: d) }
      end
      start_date = 3.months.ago.to_date.to_s
      end_date = 1.month.ago.to_date.to_s
      get "/api/v1/splits?end_date=#{end_date}&start_date=#{start_date}"

      expect(response).to have_http_status(200)
      expect(response.content_type).to eq("application/json")

      dates = response.parsed_body.map { |s| s["date"] }.uniq.sort
      expect(dates.min).to eq(start_date)
      expect(dates.max).to eq(end_date)
    end

    it "do not allow requests without start_date" do
      get "/api/v1/splits"
      expect(response).to have_http_status(422)
      expect(response.content_type).to eq("application/json")
      expect(response.parsed_body).to eq(
        "errors" => {
          "start_date" => [{ "error" => "blank" }]
        }
      )
    end

    it "do not allow requests without end_date" do
      get "/api/v1/splits?start_date=2017-01-01"
      expect(response).to have_http_status(422)
      expect(response.content_type).to eq("application/json")
      expect(response.parsed_body).to eq(
        "errors" => {
          "end_date" => [{ "error" => "blank" }]
        }
      )
    end

    it "do not allow requests with invalid start_date format" do
      get "/api/v1/splits?start_date=2017&end_date=2018-01-01"
      expect(response).to have_http_status(422)
      expect(response.content_type).to eq("application/json")
      expect(response.parsed_body).to eq(
        "errors" => {
          "start_date" => [{ "error" => "parse_error" }]
        }
      )
    end

    it "do not allow requests with invalid end_date format" do
      get "/api/v1/splits?start_date=2017-01-01&end_date=2011s"
      expect(response).to have_http_status(422)
      expect(response.content_type).to eq("application/json")
      expect(response.parsed_body).to eq(
        "errors" => {
          "end_date" => [{ "error" => "parse_error" }]
        }
      )
    end

    it "do not allow requests with invalid date range" do
      get "/api/v1/splits?start_date=2015-01-01&end_date=2018-01-01"
      expect(response).to have_http_status(416)
      expect(response.content_type).to eq("application/json")
      expect(response.parsed_body).to eq(
        "errors" => {
          "base" => [{ "error" => "invalid_date_range" }]
        }
      )
    end
  end
end
