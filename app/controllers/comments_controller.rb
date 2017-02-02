class CommentsController < ApplicationController
  before_action :find_comment, only: [:update, :destroy]
  
  def index
    query = "comments.post_id=#{params[:post_id]}"
    query = "comments.comment_id=#{params[:comment_id]}" if params[:comment_id].present?
    comments = Comment.find_by_sql("SELECT comments.id, comments.text, comments.created_at, comments.user_id, comments.post_id, comments.comment_id, users.name, users.email FROM (comments INNER JOIN users ON comments.user_id=users.id) WHERE #{query} ORDER BY comments.created_at DESC")
    # comments = Comment.select('comments.id, comments.text, comments.created_at, comments.user_id, comments.post_id, comments.comment_id, users.name, users.email, COUNT(likes.id) AS total_likes').joins(:likes).group('comments.id').joins(:user).where(query)
    respond_to do |format|
      format.json { render :json => comments }
    end
  end

  def create
    comment = current_user.comments.create(comment_params)
    respond_to do |format|
      format.json { render :json => comment.comment.first }
    end
  end

  def update
    @comment.update(comment_params)
    respond_to do |format|
      format.json { render :json => @comment.comment.first }
    end
  end

  def destroy
    status = @comment.destroy
    respond_to do |format|
      format.json { render :json => {status: status} }
    end
  end

  private
    def comment_params
      params.require(:comment).permit(:text, :user_id, :post_id, :comment_id)
    end
    def find_comment
      @comment = Comment.find(params[:id])
    end
end
