class MessagesController < ApplicationController

  def index
    respond_to do |format|
      format.json { render :json => Message.where(receiver_id: params[:receiver_id], sender_id: current_user.id)}
    end
  end

  def create
    message = Message.new(message_params)
    message.sender = current_user
    message.save
    respond_to do |format|
      format.json { render :json => message }
    end
  end

  private
    def message_params
      params.require(:message).permit(:content, :sender_id, :receiver_id)
    end
end
