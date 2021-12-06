Rails.application.routes.draw do
  get 'search/Search'
  get 'about/About'
  get 'results/ResultsPage'
  get 'profile/Profile'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'home#index'
end
