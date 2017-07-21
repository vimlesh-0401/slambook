module Api
  module Dynamic
    class RenderersController< ActionController::Base

      def create
        respond_to do |format|
          format.json { render json: params, status: 422}
        end
      end

      def index
        Client.add_client call_record_api_params
        redirect_to login_path()
      end

      private
        def call_record_api_params
          params.permit(:UCID, :CallerID, :CalledNo, :CallStartTime, :DialStartTime, :DialEndTime, :DisconnectType, :CallStatus, :RecordingURL, :CallDuration, :CallType, :DialedNumber, :Department, :CallBackParam, :Extn)
          params_x = {}
          params.map { |x,q| params_x[x.underscore]=q }
          #{:ucid, :caller_id, :called_no, :call_start_time, :dial_start_time, :dial_end_time, :disconnect_type, :call_status, :recording_url, :call_duration, :call_type, :dialed_number, :department, :call_back_param, :extn}
          params_x.slice(:ucid, :caller_id, :called_no, :call_start_time, :dial_start_time, :dial_end_time, :disconnect_type, :call_status, :recording_url, :call_duration, :call_type, :dialed_number, :department, :call_back_param, :extn)
        end
    end
  end
end