module Api
  module Dynamic
    class RenderersController< ApplicationController
      def create
        respond_to do |format|
          format.js { render params,:layout => false  }
        end
      end
    end
  end
end