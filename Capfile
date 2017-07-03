# Load DSL and set up stages
require "capistrano/setup"
require "capistrano/deploy"
require "capistrano/scm/git"
install_plugin Capistrano::SCM::Git

require 'capistrano/rvm'

set :rvm_type, :user
set :rvm_ruby_version, '2.3.3'

require 'capistrano/bundler'
require 'capistrano/rails'

require "capistrano/passenger"


Dir.glob("lib/capistrano/tasks/*.rake").each { |r| import r }
