module Api
  module Dynamic
    class RenderersController< ApplicationController
      def index
        respond_to do |format|   
          format.js { render :file => "/home/dynamic_content.js.erb",:layout => false  }
        end
      end
    end
  end
end