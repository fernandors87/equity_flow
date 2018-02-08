# frozen_string_literal: true

module Api
  module V1
    class SplitsController < Api::BaseController
      def index
        start_date, end_date = extract_dates!
        respond_with Split.includes(:deal)
                          .where(deals: { date: start_date..end_date })
      end

      private

      def permitted
        params.require(%i[start_date end_date])
      end

      def parse_date(param, date)
        Date.parse(date)
      rescue StandardError
        raise ParameterParseError.new(param, date)
      end

      def diff_in_months(start_date, end_date)
        (end_date.year * 12 + end_date.month) - (start_date.year * 12 + start_date.month)
      end

      def extract_dates!
        start_date = parse_date(:start_date, permitted[0])
        end_date = parse_date(:end_date, permitted[1])
        diff = diff_in_months(start_date, end_date)
        raise InvalidDateRange.new(start_date, end_date) if diff > 12
        [start_date, end_date]
      end
    end
  end
end
