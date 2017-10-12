set :stage, :production

server '13.126.32.247', user: 'deploy', roles: %w{web app db}

