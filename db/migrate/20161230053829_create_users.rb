class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name
      t.string :email
      t.string :phone
      t.string :address
      t.datetime :dob
      t.string  :lang
      t.timestamps null: false
    end
  end
end
