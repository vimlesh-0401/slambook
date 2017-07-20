class CreateClients < ActiveRecord::Migration[5.0]
  def change
    create_table :clients do |t|
      t.string :ucid
      t.string :caller_id
      t.string :called_no
      t.string :call_start_time
      t.string :dial_start_time
      t.string :dial_end_time
      t.string :disconnect_type
      t.string :call_status
      t.string :recording_url
      t.string :call_duration
      t.string :call_type
      t.string :dialed_number
      t.string :department
      t.string :call_back_param
      t.string :extn
      t.timestamps
    end
  end
end
