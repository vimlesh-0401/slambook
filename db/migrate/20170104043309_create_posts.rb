class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.text :text
      t.references :user
      t.timestamps null: false
    end

    add_reference :likes, :post, index: true, foreign_key: true
    add_reference :comments, :post, index: true, foreign_key: true
  end
end
