class ResultsController < ApplicationController
  before_action :authenticate_user!
  def ResultsPageErrorForum
    @searchkeywords = session[:searchkeywords]
    @language = session[:language]
    @framework = session[:framework]
    @searchparameter = session[:searchparameter]
    @user = current_user
  end

  def ResultsPageDocumentation
    @searchkeywords = session[:searchkeywords]
    @language = session[:language]
    @framework = session[:framework]
    @searchparameter = session[:searchparameter]
    @user = current_user
  end

  def ResultsPageCrawler
    @searchkeywords = session[:searchkeywords]
    @language = session[:language]
    @framework = session[:framework]
    @searchparameter = session[:searchparameter]
    @user = current_user
  end
end