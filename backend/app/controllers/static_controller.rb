class StaticController < ApplicationController
  def index
    print('hello balls'+ENV['API_ENDPOINT'])
    render file: Rails.root.join('public', 'dist', 'index.html')
  end
end
