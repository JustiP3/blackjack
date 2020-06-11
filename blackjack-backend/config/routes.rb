Rails.application.routes.draw do
  resources :players, only: [:create, :show] do 
    resources :statistics, only: [:index]
  end 
  resources :statistics, only: [:index, :create, :update, :destroy]
end


