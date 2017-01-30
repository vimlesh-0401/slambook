class CreateLikes < ActiveRecord::Migration
  def change
    create_table :likes do |t|
      t.integer :status
      t.belongs_to :user, index: true
      t.belongs_to :comment, index: true
      t.timestamps null: false
    end
  end
end
