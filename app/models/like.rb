class Like < ActiveRecord::Base
  
  belongs_to :user
  belongs_to :comment
  belongs_to :post

  validates :user_id, :status, presence: true
  validates :status, numericality: {only_integer: true, less_than_or_equal_to: 2}
  def self.like params, user
    like = Like.new(params)
    like.user = user
    like.save!
    return like
  end

  def like?
    return (self.status == 1)
  end
  def dislike?
    return (self.status == 2)
  end
end
