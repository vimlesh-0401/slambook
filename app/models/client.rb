class Client < ApplicationRecord

  def self.add_client params
    begin
      puts params
      c = Client.create(params)
    rescue Exception => e
      puts e
    end
  end
end
