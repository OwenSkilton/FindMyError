class ProfileController < ApplicationController
  def Profile
    @user=current_user
  end
end
