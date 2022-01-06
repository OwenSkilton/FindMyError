class SearchController < ApplicationController
  before_action :authenticate_user!
  def Search
    @user = current_user
  end
  def get_params
    session[:searchkeywords] = params["searchkeywords"]
    session[:language] = params["language"]
    session[:framework] = params["framework"]
    session[:searchparameter] = params["searchparameter"]
  end
end
