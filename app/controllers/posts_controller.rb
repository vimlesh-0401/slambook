class PostsController < ApplicationController
  def index
    # posts = Post.all.order(created_at: :desc)
    # posts = Post.find_by_sql('SELECT posts.id, posts.text, posts.created_at, users.id AS user_id, users.name, users.email FROM posts INNER JOIN users ON posts.user_id=users.id ORDER BY posts.created_at DESC')
    posts = Post.select('posts.*, users.name, users.email').joins(:user).where("posts.user_id IN (Select id from users LEFT JOIN friendship ON users.id=friendship.friend_id WHERE friendship.user_id=:user_id OR friendship.friend_id=:user_id)", user_id: current_user.id).order('posts.created_at DESC')

    respond_to do |format|
      format.json { render :json => posts }
    end
  end

  def create
    post = current_user.posts.create(post_params)
    respond_to do |format|
      format.json { render :json => post }
    end
  end

  private
    def post_params
      params.require(:post).permit(:text, :user_id)
    end
end
