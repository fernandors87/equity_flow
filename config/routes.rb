# frozen_string_literal: true

Rails.application.routes.draw do
  root to: "main#show"

  namespace "api" do
    namespace "v1", defaults: { format: :json } do
      resources :accounts, only: [:index]
      resources :deals, only: [:index]
      resources :splits, only: [:index]
    end
  end
end
