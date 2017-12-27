# frozen_string_literal: true

module Api
  module V1
    class AccountsController < Api::BaseController
      def index
        respond_with Account.all
      end
    end
  end
end
