class LikesController < ApplicationController
  
  def index
    # likes = Like.where(post_id: params[:post_id], status: 1)
    general  = params[:class_name].constantize.find(params[:object_id])
    likes = general.likes.where(status: 1)
    user_ids = likes.pluck(:user_id) if likes.present?
    likes_text = User.to_text user_ids, current_user
    user_like = likes.where(user_id: current_user.id).last #current_user.likes.where(post_id: params[:post_id]).last
    respond_to do |format|
      format.json { render :json => {likes: likes.count, post_id: params[:object_id], liked: user_like, users: likes_text}}
    end
  end

  def create
    general  = params[:class_name].constantize.find(params[:object_id])
    like = general.likes.find_by(user_id: current_user.id)

    # like = Like.find_by(user_id: current_user.id, post_id: params[:post_id])
    like.update(like_params) if like.present?
    like = Like.like(like_params, current_user) if like.nil?
    likes = general.likes.where(status: 1)
    user_ids = likes.pluck(:user_id) if likes.present?
    likes_text = User.to_text user_ids, current_user
    respond_to do |format|
      format.json { render :json => {likes: likes.count, post_id: params[:object_id], liked: like, users: likes_text}}
    end
  end

  def destroy
  end
  private
    def like_params
      params.require(:like).permit(:status, :comment_id, :user_id, :post_id)
    end
end
