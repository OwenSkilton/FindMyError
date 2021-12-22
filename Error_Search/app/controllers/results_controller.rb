class ResultsController < ApplicationController
  def ResultsPage
    @search = session[:search]
  end
end