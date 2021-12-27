Rails.application.routes.draw do
  devise_for :users
  get 'search/Search'
  get 'about/About'
  get 'results/ResultsPage'
  get 'profile/Profile'
  get '/resultsPageArguments', to: 'search#get_params'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'home#index'
end
