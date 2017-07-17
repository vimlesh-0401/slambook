module Api
  module Dynamic
    class RenderersController< ActionController::Base

      def create
        respond_to do |format|
          format.json { render json: params, status: 422}
        end
      end

    end
  end
end