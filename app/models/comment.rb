class Comment < ActiveRecord::Base
  
  has_many :comments, class_name: "Comment",foreign_key: "comment_id"
 
  belongs_to :comment, class_name: "Comment"
  belongs_to :post
  belongs_to :user
  has_many :likes

  validates :text, presence: true
  def comment
    Comment.find_by_sql("SELECT comments.id, comments.text, comments.created_at, comments.user_id, comments.post_id, comments.comment_id, users.name, users.email FROM (comments INNER JOIN users ON comments.user_id=users.id) WHERE comments.id=#{self.id} ORDER BY comments.created_at DESC")
  end
end
