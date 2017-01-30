class UsersController < ApplicationController

  before_filter :find_user, only: [:update]

  def index
    respond_to do |format|
      format.json { render :json => current_user.friends.order(name: :asc)}
    end
  end

  def profile
    @user = current_user
    @language = User.prefered_languages
  end

  def update
    @user.update(user_params)
    redirect_to root_path();
  end

  private
    def find_user
      @user = User.find(params[:id])
    end
    def user_params
      params.require(:user).permit(:name, :email, :lang, :address, :dob)
    end
end
