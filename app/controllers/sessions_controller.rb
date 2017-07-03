class SessionsController < Devise::SessionsController
  layout 'login'
  def create
    super
  end

  def destroy
    super
  end
end
