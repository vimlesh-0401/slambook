class CreateFriendship < ActiveRecord::Migration
  def self.up
    create_table :friendship, id: false do |t|
      t.integer :user_id
      t.integer :friend_id
    end

    add_index(:friendship, [:user_id, :friend_id], :unique => true)
    add_index(:friendship, [:friend_id, :user_id], :unique => true)
  end

  def self.down
    remove_index(:friendship, [:friend_id, :user_id])
    remove_index(:friendship, [:user_id, :friend_id])
    drop_table :friendship
  end
end
