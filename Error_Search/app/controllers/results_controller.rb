class ResultsController < ApplicationController
  before_action :authenticate_user!
  def ResultsPage
    @search = session[:search]
    @language = session[:language]
    @framework = session[:framework]
    @user = current_user
  end
end