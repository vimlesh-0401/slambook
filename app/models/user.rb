class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_many :contacts
  has_many :likes
  has_many :posts
  has_many :comments
  has_and_belongs_to_many :friends, 
              class_name: "User", 
              join_table: :friendship, 
              foreign_key: :user_id, 
              association_foreign_key: :friend_id

  LANGUAGES = {
    'Hindi' => 'hi',
    'Engilish' => 'en',
    'Kannada' => 'kn'
  }
  def self.prefered_languages
    return LANGUAGES
  end

  def self.to_text user_ids, current_user
    if user_ids.nil? || user_ids.length == 0
      return { text: '', list: []}
    end
    current_user_name = nil
    if user_ids.include?(current_user.id)
      current_user_name  = current_user.name
      user_ids.delete(current_user.id)
    end
    user_names = User.where(id: user_ids).pluck(:name)
    first_three = []
    first_three << "You" if current_user_name.present?
    first_three = first_three + user_names[0...3]
    if user_names.length <= 3
      first_text = first_three[0...(first_three.length-1)].join(', ')
      first_text += " #{"&" if first_three.length > 1} " +first_three[first_three.length-1]
    else
      first_text = first_three.join(', ') + " & #{user_names.length - first_three.length} others"
    end
    return {text: first_text, list: user_names+[current_user.name]}
  end
end
