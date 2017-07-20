class Client < ApplicationRecord

  def self.add_client params
    begin
      c = Client.create(params)
    rescue Exception => e
      puts e
    end
  end
end
