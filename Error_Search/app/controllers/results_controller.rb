class ResultsController < ApplicationController
  before_action :authenticate_user!
  def ResultsPage
    @searchkeywords = session[:searchkeywords]
    @language = session[:language]
    @framework = session[:framework]
    @searchparameter = session[:searchparameter]
    @user = current_user
  end
end