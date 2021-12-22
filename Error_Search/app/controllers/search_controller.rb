class SearchController < ApplicationController
  def Search
  end
  def get_params
    session[:search] = params["search"]
  end
end
