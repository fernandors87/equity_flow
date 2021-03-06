# frozen_string_literal: true

module Api
  module V1
    class DealsController < Api::BaseController
      def index
        respond_with Deal.includes(:splits).all
      end
    end
  end
end
