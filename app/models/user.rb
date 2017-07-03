class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :authentication_keys => [:login]
  has_many :contacts
  has_many :likes
  has_many :posts
  has_many :comments
  has_many :messages
  has_and_belongs_to_many :friends,
              class_name: "User",
              join_table: :friendship,
              foreign_key: :user_id,
              association_foreign_key: :friend_id

  attr_accessor :login

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

  def self.find_for_database_authentication(conditions={})
    find_by(email: conditions[:login])
  end

  # Devise Confirmable method
  # def only_if_unconfirmed
  #   pending_any_confirmation {yield}
  # end

  # def password_required?
  #   super if confirmed?
  # end

  # def password_match?
  #   self.errors[:password] << "can't be blank" if password.blank?
  #   self.errors[:password_confirmation] << "can't be blank" if password_confirmation.blank?
  #   self.errors[:password_confirmation] << "does not match password" if password != password_confirmation
  #   password == password_confirmation && !password.blank?
  # end
end
