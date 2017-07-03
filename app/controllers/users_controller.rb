class UsersController < ApplicationController

  before_action :find_user, only: [:update]

  def index
    respond_to do |format|
      format.json { render :json => current_user.friends.order(name: :asc)}
    end
  end

  def show

  end

  def search
    users = User.where("name ilike :search OR email ilike :search OR phone ilike :search", search: "%#{params[:sSeach]}%")
    respond_to do |format|
      format.json { render :json => users}
    end
  end

  def create
    user = User.create!(user_params)
    redirect_to root_path()
  end

  def profile
    @user = current_user
    @language = User.prefered_languages
  end

  def update
    @user.update(user_params)
    redirect_to root_path()
  end

  private
    def find_user
      @user = User.find(params[:id])
    end

    def user_params
      params.require(:user).permit(:name, :email, :lang, :address, :dob, :login, :password, :password_confirmation)
    end
end
