class ResultsController < ApplicationController
  def ResultsPage
    @search = session[:search]
    @language = session[:language]
    @framework = session[:framework]
  end
end