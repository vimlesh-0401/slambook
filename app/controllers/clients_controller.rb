class ClientsController < ActionController::Base
  layout 'client_tmp'
  def index

  end

  def clients
    respond_to do |format|
      format.json { render :json => { clients: Client.all, table: {total: Client.count}} }
    end
  end
end
