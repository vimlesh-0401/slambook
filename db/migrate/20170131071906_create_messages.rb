class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.text :content, null: false

      t.references :sender,  class_name: "User"
      t.references :receiver, class_name: "User"

      t.timestamps null: false
    end
  end
end
