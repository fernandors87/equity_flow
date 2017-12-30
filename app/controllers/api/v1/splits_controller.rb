# frozen_string_literal: true

module Api
  module V1
    class SplitsController < Api::BaseController
      def index
        respond_with Split.includes(:deal).all
      end
    end
  end
end
