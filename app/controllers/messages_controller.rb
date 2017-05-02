class MessagesController < ApplicationController

  def index
    messages = Message.where("(receiver_id=:receiver_id AND sender_id=:sender_id) OR (receiver_id=:sender_id AND sender_id=:receiver_id)", sender_id: current_user.id, receiver_id: params[:receiver_id])
    #(receiver_id: params[:receiver_id], sender_id: current_user.id)
    respond_to do |format|
      format.json { render :json => messages}
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
