class SlambookChannel < ApplicationCable::Channel
  def subscribed
    stream_from "slambook"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
