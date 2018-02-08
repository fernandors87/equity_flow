# frozen_string_literal: true

module Api
  class BaseController < ApplicationController
    self.responder = ApplicationResponder

    protect_from_forgery with: :null_session
    respond_to :json

    class ParameterParseError < RuntimeError
      attr_reader :param

      def initialize(param, value)
        @param = param
        @value = value
        super("error parsing parameter #{param} with value '#{value}'")
      end
    end

    class InvalidDateRange < RuntimeError
      attr_reader :start_date, :end_date

      def initialize(start_date, end_date)
        @start_date = start_date
        @end_date = end_date
        super("period is out of valid date range")
      end
    end

    rescue_from ActionController::ParameterMissing do |exception|
      exception_to_param_error exception, msg: "blank"
    end

    rescue_from ParameterParseError do |exception|
      exception_to_param_error exception, msg: "parse_error"
    end

    rescue_from InvalidDateRange do |exception|
      exception_to_base_error exception, msg: "invalid_date_range", status: 416
    end

    private

    def exception_to_base_error(_exception, msg: nil, status: nil)
      error = { base: [{ error: msg }] }
      response = { errors: error }
      respond_to do |format|
        format.json { render json: response, status: status || 422 }
      end
    end

    def exception_to_param_error(exception, msg: nil, status: nil)
      error = { exception.param => [{ error: msg }] }
      response = { errors: error }
      respond_to do |format|
        format.json { render json: response, status: status || 422 }
      end
    end
  end
end
