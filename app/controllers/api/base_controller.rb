# frozen_string_literal: true

module Api
  class BaseController < ApplicationController
    self.responder = ApplicationResponder

    protect_from_forgery with: :null_session
    respond_to :json
    #
    #    rescue_from(ActionController::ParameterMissing) do |exception|
    #      error = { exception.param => [{ error: "blank" }] }
    #      response = { errors: error }
    #      respond_to do |format|
    #        format.json { render json: response, status: :unprocessable_entity }
    #      end
    #    end
    #
    #    rescue_from(ActiveRecord::RecordNotFound) do |exception|
    #      error = { exception.model.underscore => [{ error: "not_found", id: exception.id }] }
    #      response = { errors: error }
    #      respond_to do |format|
    #        format.json { render json: response, status: :not_found }
    #      end
    #    end
  end
end
