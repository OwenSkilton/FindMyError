class SearchController < ApplicationController
  before_action :authenticate_user!
  def Search
    @user = current_user
  end
  def get_params
    session[:search] = params["search"]
    session[:language] = params["language"]
    session[:framework] = params["framework"]
  end
end
