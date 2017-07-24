Rails.application.routes.draw do

  get 'clients/index'

  root 'home#index'
  get '/users/sign_in', to: redirect('login')

  devise_for :users, :controllers => {:confirmations => 'confirmations', :sessions => 'sessions'}

  devise_scope :user do
    patch '/confirm', to: 'confirmations#confirm', as: 'confirm'
    get 'login', to: 'sessions#new'
  end
  resources :users do
    get :profile
    collection do
      get :search
    end
  end
  resources :contacts
  resources :comments
  resources :likes
  resources :posts
  resources :messages, only: [:create, :index]
  resources :clients, only: [:index] do
    collection do
      get :clients
    end
  end
  get 'login_status', to: 'home#login_status'

  namespace :api do
    namespace :dynamic do
      resources :renderers,  only: [:create, :index]
    end
  end
end
