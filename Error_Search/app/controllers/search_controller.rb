class SearchController < ApplicationController
  def Search
  end
  def get_params
    session[:search] = params["search"]
    session[:language] = params["language"]
    session[:framework] = params["framework"]
  end
end
