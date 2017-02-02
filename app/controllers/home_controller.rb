class HomeController < ApplicationController
  def index
    
  end

  def login_status
    if current_user.present?
      ActionCable.server.broadcast 'slambook',
        message: "you are logged in.."
      head :ok
    end
  end
end
