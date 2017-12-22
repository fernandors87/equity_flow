# frozen_string_literal: true

Rails.application.routes.draw do
  namespace "api" do
    namespace "v1", defaults: { format: :json } do
      resources :deals
    end
  end
end
